import { getWatcherRequests } from "../../../lib/services/request"

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const requests = await getWatcherRequests(req.query.watcherId)
    res.status(200).json({
      status: 200,
      message: "Ok",
      error: null,
      data: {
        requests: requests
      }
    })
  }
}