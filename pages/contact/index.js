import Head from 'next/head'
import ContactForm from '../../components/contact/contact-form'

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact Me" />
      </Head>
      <ContactForm />
    </>
  )
}

export default ContactPage
