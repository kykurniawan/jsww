import { useState } from 'react'
import { useWatchers } from '../hooks/watcher'
import Loader from './Loader'
import toast from 'react-hot-toast'
import Error from './Error'
import WatcherItem from './WatcherItem'

function WatcherList({ session }) {
  const { watchers, loading, error, mutateWatchers } = useWatchers(session?.user._id)
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)

  const create = async () => {
    setProcessing(true)
    const response = await fetch('/api/watchers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, userId: session?.user._id })
    })
    const json = await response.json()
    setProcessing(false)
    if (json.status == 201) {
      toast.success('New watcher created.')
      mutateWatchers()
    } else if (json.status == 400) {
      toast.error(json.error.details[0].message)
    }
    setName('')
  }

  const handlers = {
    delete: async (watcher) => {
      setProcessing(true)
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'api/watchers/' + watcher._id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user._id,
          watcherId: watcher._id,
        })
      })
      const json = await response.json()
      setProcessing(false)
      if (json.status == 200) {
        toast.success('Watcher "' + watcher.name + '" deleted successfully.')
        mutateWatchers()
      }
    }
  }

  if (loading || processing) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  if (watchers.length < 1) {
    return (
      <div className="border-2 border-blue-400 bg-blue-50 rounded px-3 py-10 md:px-10 md:py-10">
        <p className="text-blue-600 text-center text-lg">You do not have any webhook watchers yet. Want to make it?</p>
        <div className="mt-5 text-center">
          <input value={name} onChange={(evt) => setName(evt.target.value)} className="input-blue" placeholder="Type a watcher name..." />
          <button onClick={create} className="btn-blue">Create</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-right mb-5">
        <input value={name} onChange={(evt) => setName(evt.target.value)} className="input-blue" placeholder="New watcher name" />
        <button onClick={create} className="btn-blue">Create</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {watchers.map(watcher => (<WatcherItem key={watcher._id} watcher={watcher} handlers={handlers} />))}
      </div>
    </>
  )
}

export default WatcherList