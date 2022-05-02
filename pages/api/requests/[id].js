import { deleteWatcherRequest } from "../../../lib/services/request"

export default async function handler(req, res) {

  const { method } = req

  if (method === 'DELETE') {
    try {
      const deleted = await deleteWatcherRequest(req.query.id)
      res.status(200).json({
        status: 200,
        message: "Ok",
        error: null,
        data: {
          deleted: deleted
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}