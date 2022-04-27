import { getSession } from 'next-auth/react'
import Navigation from '../../components/Navigation'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { io } from "socket.io-client"
import WatcherDetail from '../../components/WatcherDetail'

let socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
  path: '/api/socket'
})

export default function WatcherDetailPage({ session }) {
  return (
    <>
      <Head>
        <title>Just a Simple Webhook Watcher</title>
        <meta name="description" content="Just a Simple Webhook Watcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation session={session} />
      <main>
        <WatcherDetail session={session} socket={socket} />
      </main>
      <Toaster />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}