import ZoneControlPlanesList from './components/ZoneControlPlanesList.vue'
import { features } from './features'
import locales from './locales/en-us/index.yaml'
import { routes } from './routes'
import { sources } from './sources'
import egressLocales from '@/app/zone-egresses/locales/en-us/index.yaml'
import ingressLocales from '@/app/zone-ingresses/locales/en-us/index.yaml'
import type { ServiceDefinition } from '@/services/utils'
import { token, createInjections } from '@/services/utils'

type Token = ReturnType<typeof token>

const $ = {
  ZoneControlPlanesList: token<typeof ZoneControlPlanesList>('zones.components.ZoneControlPlanesList'),
}

export const services = (app: Record<string, Token>): ServiceDefinition[] => {
  return [
    [$.ZoneControlPlanesList, {
      service: () => {
        return ZoneControlPlanesList
      },
    }],

    [token('zones.routes'), {
      service: routes,
      arguments: [
        app.can,
      ],
      labels: [
        app.routes,
      ],
    }],
    [token('zone.sources'), {
      service: sources,
      arguments: [
        app.source,
        app.api,
      ],
      labels: [
        app.sources,
      ],
    }],
    [token('zone.features'), {
      service: features,
      arguments: [
        app.env,
      ],
      labels: [
        app.features,
      ],
    }],
    [token('zones.locales'), {
      service: () => locales,
      labels: [
        app.enUs,
      ],
    }],
    [token('zone-egresses.locales'), {
      service: () => egressLocales,
      labels: [
        app.enUs,
      ],
    }],
    [token('zones-ingresses.locales'), {
      service: () => ingressLocales,
      labels: [
        app.enUs,
      ],
    }],
  ]
}
export const TOKENS = $
export const [
  useZoneControlPlanesList,
] = createInjections(
  $.ZoneControlPlanesList,
)
