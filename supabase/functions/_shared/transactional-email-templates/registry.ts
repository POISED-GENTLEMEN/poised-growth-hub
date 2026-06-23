import type { ComponentType } from 'npm:react@18.3.1'
import { template as contactNotification } from './contact-notification.tsx'
import { template as schoolsOnePagerDelivery } from './schools-one-pager-delivery.tsx'
import { template as schoolsOnePagerInternal } from './schools-one-pager-internal.tsx'

export type TemplateEntry = {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
  'schools-one-pager-delivery': schoolsOnePagerDelivery,
  'schools-one-pager-internal': schoolsOnePagerInternal,
}
