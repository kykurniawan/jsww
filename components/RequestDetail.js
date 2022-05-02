import React from 'react'

function RequestDetail({ detailed }) {

  if (detailed == null) {
    return (
      <div className="px-5 py-10 rounded bg-white">
        <p className="text-center text-gray-600">Click the request item to see details.</p>
      </div>
    )
  }
  return (
    <div className="p-5 rounded bg-white">
      <h5 className="text-gray-600 font-semibold mb-3">Headers</h5>
      <div className="border rounded p-2 overflow-x-auto mb-3">
        <table className="table-auto">
          <tbody>
            {Object.entries(detailed.data.headers).map(entry => (
              <tr key={entry[0]}>
                <td className="whitespace-nowrap">
                  <div className="bg-blue-50 px-2 py-1 mb-2 rounded">{entry[0]}</div>
                </td>
                <td>
                  <div className="px-2 py-1 mb-2">
                    {entry[1]}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(detailed.data.body) ? (
        <>
          <h5 className="text-gray-600 font-semibold mb-3">Body</h5>
          <div className="border rounded p-2 overflow-x-auto mb-3">
            <table className="table-auto">
              <tbody>
                {Object.entries(detailed.data.body).map(entry => (
                  <tr key={entry[0]}>
                    <td className="whitespace-nowrap">
                      <div className="bg-blue-50 px-2 py-1 mb-2 rounded">{entry[0]}</div>
                    </td>
                    <td>
                      <div className="px-2 mb-2">
                        {entry[1]}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
      {(Object.keys(detailed.data.cookies).length > 0) ? (
        <>
          <h5 className="text-gray-600 font-semibold mb-3">Cookies</h5>
          <div className="border rounded p-2 overflow-x-auto mb-3">
            <table className="table-auto">
              <tbody>
                {Object.entries(detailed.data.cookies).map(entry => (
                  <tr key={entry[0]}>
                    <td className="whitespace-nowrap">
                      <div className="bg-blue-50 px-2 py-1 mb-2 rounded">{entry[0]}</div>
                    </td>
                    <td>
                      <div className="px-2 mb-2">
                        {entry[1]}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default RequestDetail