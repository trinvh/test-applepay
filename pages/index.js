import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Script src="https://www.google-analytics.com/analytics.js" />
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

          <apple-pay-button buttonstyle="black" type="buy" locale="el-GR"></apple-pay-button>

        </main>
      </div>

    </>
  )
}
