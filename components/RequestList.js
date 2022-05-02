import React from 'react'
import Loader from './Loader'
import Error from './Error'
import RequestItem from './RequestItem'
import { TrashIcon } from '@heroicons/react/solid'

function RequestList({ requests, loading, error, clickCallback, deleteCallback, active }) {
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  if (requests.length < 1) {
    return (
      <div className="py-10 px-5 text-center rounded bg-white mb-5">
        <h2 className="text-gray-600">No incoming request...</h2>
      </div>
    )
  }

  return (
    <div className="p-5 rounded bg-white mb-5">
      {requests.map(request => {
        return (active != null && active._id == request._id) ? (
          <div className="relative" key={request._id}>
            <button onClick={() => deleteCallback(request)} className="absolute top-0 right-0 bg-white border"><TrashIcon className="h-5 w-5 text-red-600" /></button>
            <div onClick={() => clickCallback(request)} className="cursor-pointer bg-blue-100 hover:bg-gray-100 transition-colors duration-300" role={'button'}>
              <RequestItem request={request} />
            </div>
          </div>
        ) : (
          <div className="relative" key={request._id}>
            <button onClick={() => deleteCallback(request)} className="absolute top-0 right-0 bg-white border"><TrashIcon className="h-5 w-5 text-red-600" /></button>
            <div onClick={() => clickCallback(request)} className="cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-300" role={'button'}>
              <RequestItem request={request} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RequestList