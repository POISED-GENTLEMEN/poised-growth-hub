/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Field {
  label: string
  value?: string | null
}

interface ContactNotificationProps {
  segment?: string
  segmentLabel?: string
  name?: string
  email?: string
  phone?: string
  message?: string
  submittedAt?: string
  fields?: Field[]
}

const NOTIFICATION_RECIPIENT = 'david@risetopurpose.org'

const Email = ({
  segment = 'other',
  segmentLabel = 'Other',
  name = '',
  email = '',
  phone = '',
  message = '',
  submittedAt = '',
  fields = [],
}: ContactNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New {segmentLabel} inquiry from {name || email}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Inquiry</Heading>
        <Text style={subtitle}>
          {segmentLabel}
          {submittedAt ? ` · ${submittedAt}` : ''}
        </Text>

        <Hr style={hr} />

        <Section>
          <Row label="Segment" value={segmentLabel} />
          <Row label="Name" value={name} />
          <Row
            label="Email"
            value={
              email ? (
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              ) : null
            }
          />
          {phone ? (
            <Row
              label="Phone"
              value={
                <Link href={`tel:${phone}`} style={link}>
                  {phone}
                </Link>
              }
            />
          ) : null}
          {fields.map((f) =>
            f.value ? <Row key={f.label} label={f.label} value={f.value} /> : null
          )}
        </Section>

        {message ? (
          <>
            <Hr style={hr} />
            <Text style={fieldLabel}>Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>
          Sent automatically from poisedgentlemen.com/contact
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => (
  <table style={rowTable} cellPadding={0} cellSpacing={0}>
    <tbody>
      <tr>
        <td style={rowLabelCell}>{label}</td>
        <td style={rowValueCell}>{value || '—'}</td>
      </tr>
    </tbody>
  </table>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New ${data?.segmentLabel || 'Contact'} inquiry — ${data?.name || data?.email || 'Poised Gentlemen'}`,
  displayName: 'Contact Form Notification',
  to: NOTIFICATION_RECIPIENT,
  previewData: {
    segment: 'school',
    segmentLabel: 'School or Organization',
    name: 'Jane Doe',
    email: 'jane@example.org',
    phone: '504-555-0100',
    message: 'We would love to bring Project Power to our middle school.',
    submittedAt: new Date().toISOString(),
    fields: [
      { label: 'Organization', value: 'Lincoln Middle School' },
      { label: 'Role', value: 'Principal' },
      { label: 'Program Interest', value: 'Project Power' },
      { label: 'Group Size', value: '25-50' },
      { label: 'Timeline', value: 'This semester' },
    ],
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Montserrat', Arial, sans-serif",
}
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  fontFamily: "'Playfair Display', Georgia, serif",
  color: '#1F2937',
  margin: '0 0 6px',
}
const subtitle = {
  fontSize: '13px',
  color: '#6B7280',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
}
const hr = { borderColor: '#E5E7EB', margin: '20px 0' }
const rowTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  margin: '0 0 10px',
}
const rowLabelCell = {
  width: '38%',
  fontSize: '12px',
  color: '#6B7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  padding: '6px 8px 6px 0',
  verticalAlign: 'top' as const,
}
const rowValueCell = {
  fontSize: '14px',
  color: '#1F2937',
  padding: '6px 0',
  verticalAlign: 'top' as const,
}
const fieldLabel = {
  fontSize: '12px',
  color: '#6B7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 6px',
}
const messageStyle = {
  fontSize: '14px',
  color: '#1F2937',
  lineHeight: '1.55',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
  padding: '12px 14px',
  backgroundColor: '#F9FAFB',
  borderLeft: '3px solid #D4A72C',
  borderRadius: '4px',
}
const link = { color: '#D4A72C', textDecoration: 'underline' }
const footer = {
  fontSize: '12px',
  color: '#9CA3AF',
  margin: '20px 0 0',
}

export default Email
