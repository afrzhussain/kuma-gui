import deepmerge from 'deepmerge'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { dependencies, escapeRoute } from './fake'
import type { MockResponse, FS, AEnv, AppEnvKeys, MockEnvKeys } from './fake'
import type { ArrayMergeOptions } from 'deepmerge'
import type { RestRequest } from 'msw'

export { fakeApi } from './fake'
export type { FS, EndpointDependencies, MockResponder } from './fake'

export type Merge = (obj: Partial<MockResponse>) => MockResponse
export type Callback = (merge: Merge, req: RestRequest, response: MockResponse) => MockResponse
export type Options = Record<string, string>
type Server = ReturnType<typeof setupServer>

// merges objects in array positions rather than replacing
const combineMerge = (target: object[], source: object[], options: ArrayMergeOptions): object[] => {
  const destination = target.slice()

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options)
    } else if (target.indexOf(item) === -1) {
      destination.push(item)
    }
  })
  return destination
}

const noop: Callback = (_merge, _req, response) => response
export const createMerge = (response: MockResponse): Merge => (obj) => deepmerge(response, obj, { arrayMerge: combineMerge })

export const mocker = (env: AEnv, server: Server, fs: FS) => {
  const baseUrl = env('KUMA_API_URL')

  return (route: string, opts: Options = {}, cb: Callback = noop) => {
    // mocks during testing have a consistent seed unless we set a different
    // one during testing
    dependencies.fake.seed(typeof opts.FAKE_SEED !== 'undefined' ? parseInt(typeof opts.FAKE_SEED) : 1)
    const endpoint = fs[route]
    return server.use(
      rest.all(`${baseUrl}${escapeRoute(route)}`, async (req, res, ctx) => {
        const fetch = endpoint({
          ...dependencies,
          env: (key, d = '') => (opts[key as MockEnvKeys] ?? '') || env(key as AppEnvKeys, d),
        })
        const _response = fetch(req)
        const response = cb(createMerge(_response), req, _response)
        return res(
          ctx.status(parseInt(response.headers['Status-Code'] ?? '200')),
          ctx.json(response.body),
        )
      }),
    )
  }
}
export type Mocker = ReturnType<typeof mocker>
