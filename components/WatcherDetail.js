import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loader from './Loader'
import Error from './Error'
import { useWatcher } from '../hooks/watcher'
import toast from 'react-hot-toast'
import RequestList from './RequestList'
import RequestDetail from './RequestDetail'
import { useRequests } from '../hooks/request'

function WatcherDetail() {
  const router = useRouter()
  const { id } = router.query
  const { watcher, loading, error } = useWatcher(id)
  const { requests, loading: requestLoading, error: requestError, mutateRequests } = useRequests(id)
  const [detailed, setDetailed] = useState(null)

  const clickCallback = async (request) => {
    if (detailed != null && detailed._id == request._id) {
      setDetailed(null)
    } else {
      setDetailed(request)
    }
  }

  const deleteCallback = async (request) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'api/requests/' + request._id, {
      method: "DELETE",
    })
    const json = await response.json()
    if (json.status == 200) {
      toast.success('Request deleted successfully.')
      mutateRequests()
      setDetailed(null)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="container">
      <div className="py-10">
        <div className="mb-5 flex gap-2">
          <Link href={'/'}>
            <a className="btn-blue">Back</a>
          </Link>
        </div>
        <div className="p-5 rounded bg-white mb-5">
          <h1 className="text-xl text-gray-600 font-semibold mb-3">{watcher.name}</h1>
          <small className="italic">Click webhook URl to copy</small>
          <input readOnly={true} onClick={(evt) => {
            evt.target.select()
            navigator.clipboard.writeText(evt.target.value).then(_ => {
              toast.success("Link copied successfully")
            })
          }} className="w-full px-2 py-1 bg-gray-100 outline-none focus:outline-none" value={process.env.NEXT_PUBLIC_BASE_URL + "api/webhooks/" + watcher._id} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <div className="col-span-1">
            <h2 className="text-gray-600 font-semibold mb-3">Request List -- <button onClick={() => mutateRequests()} className="text-blue-600 hover:text-red-600">Refresh</button></h2>
            <RequestList active={detailed} clickCallback={clickCallback} deleteCallback={deleteCallback} requests={requests} loading={requestLoading} error={requestError} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-gray-600 font-semibold mb-3">Request Detail</h2>
            <RequestDetail detailed={detailed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatcherDetail