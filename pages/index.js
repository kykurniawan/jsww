import Head from 'next/head'
import Navigation from '../components/Navigation'
import { getSession } from 'next-auth/react'
import Dashboard from '../components/Dashboard'
import Signin from '../components/Signin'
import { Toaster } from 'react-hot-toast'

export default function Home({ session }) {
  return (
    <>
      <Head>
        <title>Just a Simple Webhook Watcher</title>
        <meta name="description" content="Just a Simple Webhook Watcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation session={session} />
      <main>
        {(!session) ?
          (
            <>
              <div className="container">
                <div className="text-center pt-10 pb-5">
                  <h1 className="text-5xl font-semibold text-blue-600">JSWW</h1>
                  <h4 className="text-xl text-gray-600">Just a Simple Webhook Watcher</h4>
                  <p className="text-md mt-3 text-gray-600">Are you building an application that calls a webhook? or do you want to see the data sent by the webhook?<br />If so, give this simple tool a try.</p>
                </div>
              </div>
              <Signin />
            </>
          )
          :
          (<Dashboard session={session} />)
        }
      </main>
      <Toaster />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    },
  }
}