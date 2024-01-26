import { useEffect, useState } from 'react'
import classes from './contact-form.module.css'
import Notification from '../ui/notification'

async function sendContactData(contactDetails) {
  const response = await fetch(`/api/contact`, {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(response.message || 'Something went wrong!')
  }
}

const ContactForm = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState()
  const [requestError, setRequestError] = useState()
  async function sendMessageHandler(e) {
    e.preventDefault
    try {
      setRequestStatus('pending')
      await sendContactData({ email, name, message })
      setRequestStatus('success')
      setMessage('')
      setMessage('')
      setMessage('')
    } catch (error) {
      setRequestStatus('error')
      setRequestError(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  let notification
  if (requestStatus == 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message',
      message: 'Your message is on the way',
    }
  } else if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message Sent',
    }
  } else if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError,
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  )
}

export default ContactForm
