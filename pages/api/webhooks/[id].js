import { createWatcherRequest } from "../../../lib/services/request"

export default async function handler(req, res) {
  // insert request data to database
  await createWatcherRequest(req.query.id, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    cookies: req.cookies,
  })
  res.status(200).send("OK")
}