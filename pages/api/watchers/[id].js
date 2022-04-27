import { deleteUserWatcher, getUserWatcher } from "../../../lib/services/watcher";

export default async function handle(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const watcher = await getUserWatcher(req.query.id)
      res.status(200).json({
        status: 200,
        message: "Ok",
        error: null,
        data: {
          watcher: watcher
        }
      })
      break;
    case "DELETE":
      const deleted = await deleteUserWatcher(req.body.userId, req.body.watcherId)
      res.status(200).json({
        status: 200,
        message: "Ok",
        error: null,
        data: {
          deleted: deleted
        }
      })
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}