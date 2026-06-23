/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
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

interface Props {
  firstName?: string
  organization?: string
  pdfUrl?: string
}

const DEFAULT_PDF_URL =
  'https://poisedgentlemen.com/__l5e/assets-v1/a0c5f5bb-8856-4449-b171-0c5e641d6508/Poised_Gentlemen_Schools_OnePager.pdf'

const Email = ({ firstName = '', organization = '', pdfUrl = DEFAULT_PDF_URL }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Poised Gentlemen one-pager is ready to download</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your One-Pager Is Ready</Heading>
        <Text style={body}>
          {firstName ? `Hi ${firstName},` : 'Hello,'}
        </Text>
        <Text style={body}>
          Thank you for requesting the Poised Gentlemen programs overview
          {organization ? ` for ${organization}` : ''}. Your one-page summary —
          built for principals, boards, and executive directors — is attached
          below.
        </Text>

        <Section style={{ textAlign: 'center' as const, margin: '28px 0' }}>
          <Button href={pdfUrl} style={button}>
            Download the One-Pager (PDF)
          </Button>
        </Section>

        <Text style={body}>
          If the button doesn't open, paste this link into your browser:
        </Text>
        <Text style={linkLine}>
          <Link href={pdfUrl} style={link}>{pdfUrl}</Link>
        </Text>

        <Hr style={hr} />

        <Text style={body}>
          A member of our team will follow up within one business day. If you'd
          like to talk sooner, reply to this email or reach David Rachal III,
          CEO[G], at{' '}
          <Link href="mailto:david@risetopurpose.org" style={link}>
            david@risetopurpose.org
          </Link>
          {' '}or 504-484-9037.
        </Text>

        <Text style={signoff}>Stay Poised.</Text>
        <Text style={footer}>
          Poised Gentlemen · Rise to Purpose LLC · New Orleans, LA
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your Poised Gentlemen One-Pager (PDF inside)',
  displayName: 'Schools One-Pager Delivery',
  previewData: {
    firstName: 'Jane',
    organization: 'Lincoln Middle School',
    pdfUrl: DEFAULT_PDF_URL,
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Montserrat', Arial, sans-serif",
  color: '#1F2937',
}
const container = { padding: '28px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '26px',
  fontWeight: 'bold' as const,
  fontFamily: "'Playfair Display', Georgia, serif",
  color: '#0B1B3B',
  margin: '0 0 16px',
}
const body = { fontSize: '15px', lineHeight: '1.6', margin: '0 0 14px' }
const button = {
  backgroundColor: '#D4A72C',
  color: '#0B1B3B',
  padding: '14px 28px',
  borderRadius: '4px',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
}
const linkLine = { fontSize: '13px', margin: '0 0 8px', wordBreak: 'break-all' as const }
const link = { color: '#D4A72C', textDecoration: 'underline' }
const hr = { borderColor: '#E5E7EB', margin: '24px 0' }
const signoff = {
  fontSize: '15px',
  fontFamily: "'Playfair Display', Georgia, serif",
  color: '#0B1B3B',
  margin: '20px 0 6px',
}
const footer = { fontSize: '12px', color: '#9CA3AF', margin: '6px 0 0' }

export default Email
