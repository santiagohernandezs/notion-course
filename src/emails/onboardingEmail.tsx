import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text
} from '@react-email/components'

interface OnboardingEmailProps {
  name: string
  email: string
}

export const OnboardingEmail = ({ name, email }: OnboardingEmailProps) => (
  <Html>
    <Head />
    <Preview>The sales intelligence platform that helps you uncover qualified leads.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`/public/brand/LOGO-SIN-TAGLINE.webp`}
          width='170'
          height='50'
          alt='Koala'
          style={logo}
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Welcome to Koala, the sales intelligence platform that helps you uncover qualified leads
          and close deals faster.
        </Text>
        <Text style={paragraph}>
          You have successfully signed up for our platform with the email address {email}. We are
          excited to have you on board and can't wait to see how Koala can help you grow your
          business.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href='https://getkoala.com'>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Koala team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>470 Noor Ave STE B #1148, South San Francisco, CA 94080</Text>
      </Container>
    </Body>
  </Html>
)

export default OnboardingEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px'
}

const logo = {
  margin: '0 auto'
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px'
}

const btnContainer = {
  textAlign: 'center' as const
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px'
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0'
}

const footer = {
  color: '#8898aa',
  fontSize: '12px'
}
