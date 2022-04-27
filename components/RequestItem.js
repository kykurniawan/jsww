import React from 'react'

function RequestItem({ request }) {
  return (
    <div className="border rounded p-5 mb-5">
      <span className="mr-3 text-sm bg-green-600 text-white p-1 rounded">{request.data.method}</span>
      {request.time}
    </div>
  )
}

export default RequestItem