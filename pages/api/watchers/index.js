import { getUserWatchers, createUserWatcher } from "../../../lib/services/watcher";
import { createWatcherSchema } from "../../../lib/validations/watcher";

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      const watchers = await getUserWatchers(query.userId)
      res.status(200).json({
        status: 200,
        message: "Ok",
        error: null,
        data: {
          watchers: watchers
        }
      })
      break;
    case "POST":
      const { error, value } = createWatcherSchema.validate({ userId: body.userId, name: body.name })
      if (error != undefined) {
        res.status(400).json({
          status: 400,
          message: "Validation error",
          error: error,
          data: null
        })
      } else {
        const watcher = await createUserWatcher(value.userId, value.name)
        res.status(201).json({
          status: 201,
          message: "Watcher successfully created",
          error: null,
          data: {
            watcher: watcher
          }
        })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}