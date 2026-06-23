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
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  firstName?: string
  organization?: string
  email?: string
  role?: string
  submittedAt?: string
}

const NOTIFICATION_RECIPIENT = 'david@risetopurpose.org'

const Email = ({
  firstName = '',
  organization = '',
  email = '',
  role = '',
  submittedAt = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New schools one-pager request from {firstName || email} ({organization})
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Schools One-Pager Request</Heading>
        <Text style={subtitle}>
          /schools/one-pager{submittedAt ? ` · ${submittedAt}` : ''}
        </Text>

        <Hr style={hr} />

        <Row label="First name" value={firstName} />
        <Row label="Organization" value={organization} />
        <Row
          label="Email"
          value={
            email ? (
              <Link href={`mailto:${email}`} style={link}>{email}</Link>
            ) : '—'
          }
        />
        <Row label="Role" value={role} />

        <Hr style={hr} />
        <Text style={footer}>
          The PDF has already been emailed to the requester automatically.
          Follow up within one business day.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
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
    `New One-Pager Request — ${data?.organization || data?.firstName || data?.email || 'Schools'}`,
  displayName: 'Schools One-Pager Internal Notification',
  to: NOTIFICATION_RECIPIENT,
  previewData: {
    firstName: 'Jane',
    organization: 'Lincoln Middle School',
    email: 'jane@example.org',
    role: 'School Administrator',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  fontFamily: "'Playfair Display', Georgia, serif",
  color: '#0B1B3B',
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
const rowTable = { width: '100%', borderCollapse: 'collapse' as const, margin: '0 0 10px' }
const rowLabelCell = {
  width: '38%',
  fontSize: '12px',
  color: '#6B7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  padding: '6px 8px 6px 0',
  verticalAlign: 'top' as const,
}
const rowValueCell = { fontSize: '14px', color: '#1F2937', padding: '6px 0', verticalAlign: 'top' as const }
const link = { color: '#D4A72C', textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#9CA3AF', margin: '14px 0 0' }

export default Email
