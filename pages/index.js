import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [isApplePaySupported, setIsApplePaySupported] = React.useState(false)
  
  const start = async () => {
    const enabled = window.ApplePaySession && ApplePaySession.canMakePayments()
    setIsApplePaySupported(enabled)

    const onClick = () => {
      const request = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities: ['supports3DS'],
        total: { label: 'Demo (Card is not charged)', amount: '10.00' },
      }
      const session = new ApplePaySession(3, request);
      handleApplePayEvents(session)

      session.onvalidatemerchant = event => {
        console.log('validating merchant', event)
        const { validationURL } = event
        fetch(`api/merchant-session/new/?validationURL=` + validationURL)
          .then(res => res.json())
          .then(data => {
            session.completeMerchantValidation(data);
          });
      }
      session.onpaymentauthorized = payment => {
        console.log('on payment authorized', payment)

        // call to API to make payment and charge the card
        const status = ApplePaySession.STATUS_SUCCESS
        session.completePayment(status)
      }
      session.begin()
    }

    if (enabled) {
      while(!document.getElementById('btn')) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      document.getElementById('btn').addEventListener('click', onClick)
      console.log('ok')
    }
  }

  const handleApplePayEvents = (session) => {
    console.log({ session })
  }
  React.useEffect(() => {
    start()
  }, [])
  

  

  return (
    <>
      <Script src="https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js" />
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          {isApplePaySupported && 
            <apple-pay-button id="btn" buttonstyle="black" type="buy" locale="en-US" />
          }
        </main>
      </div>

    </>
  )
}
