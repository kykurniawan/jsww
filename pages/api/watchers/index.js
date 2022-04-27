import { getUserWatchers, createUserWatcher } from "../../../lib/services/watcher";
import { createWatcherSchema } from "../../../lib/validations/watcher";

export default async function handler(req, res) {
  const { method, body, query } = req

  if (method == 'GET') {
    const watchers = await getUserWatchers(query.userId)
    return res.status(200).json({
      status: 200,
      message: "Ok",
      error: null,
      data: {
        watchers: watchers
      }
    })
  }

  if (method == 'POST') {
    const { error, value } = createWatcherSchema.validate({ userId: body.userId, name: body.name })
    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        error: error,
        data: null
      })
    } else {
      const watcher = await createUserWatcher(value.userId, value.name)
      return res.status(201).json({
        status: 201,
        message: "Watcher successfully created",
        error: null,
        data: {
          watcher: watcher
        }
      })
    }
  }

  res.status(405).end(`Method ${method} Not Allowed`)
}