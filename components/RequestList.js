import React from 'react'
import Loader from './Loader'
import Error from './Error'
import RequestItem from './RequestItem'

function RequestList({ requests, loading, error, clickCallback, active }) {
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  if (requests.length < 1) {
    return (
      <div className="py-10 px-5 text-center rounded bg-white mb-5">
        <h2 className="text-gray-600">Waiting for incoming request...</h2>
      </div>
    )
  }

  return (
    <div className="p-5 rounded bg-white mb-5">
      {requests.map(request => {
        return (active != null && active._id == request._id) ? (
          <div onClick={() => clickCallback(request)} key={request._id} className="cursor-pointer bg-blue-100 hover:bg-gray-100 transition-colors duration-300" role={'button'}>
            <RequestItem request={request} />
          </div>
        ) : (
          <div onClick={() => clickCallback(request)} key={request._id} className="cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-300" role={'button'}>
            <RequestItem request={request} />
          </div>
        )
      })}
    </div>
  )
}

export default RequestList