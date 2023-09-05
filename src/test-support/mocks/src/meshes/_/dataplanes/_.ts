import type { EndpointDependencies, MockResponder } from '@/test-support'
export default ({ fake }: EndpointDependencies): MockResponder => (req) => {
  const { mesh, name } = req.params
  const isGateway = name.includes('-gateway')
  const service = fake.kuma.serviceName(isGateway ? 'gateway_builtin' : 'internal')
  const isMultizone = true && fake.datatype.boolean()
  const zone = fake.hacker.noun()

  return {
    headers: {
    },
    body: {
      type: 'Dataplane',
      mesh,
      name,
      creationTime: '2021-02-17T08:33:36.442044+01:00',
      modificationTime: '2021-02-17T08:33:36.442044+01:00',
      networking: {
        address: fake.internet.ip(),
        ...(isGateway && {
          gateway: {
            tags: {
              'kuma.io/service': service,
              ...(isMultizone && {
                'kuma.io/zone': zone,
              }),
            },
            type: 'BUILTIN',
          },
        }),
        inbound: [
          fake.kuma.inbound(service, isMultizone ? zone : undefined),
        ],
        outbound: [
          {
            port: fake.internet.port(),
            tags: {
              'kuma.io/service': fake.kuma.serviceName(),
            },
          },
        ],
      },
    },
  }
}
