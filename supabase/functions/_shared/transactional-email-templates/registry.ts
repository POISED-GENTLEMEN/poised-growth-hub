import type { ComponentType } from 'npm:react@18.3.1'
import { template as contactNotification } from './contact-notification.tsx'

export type TemplateEntry = {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
}
