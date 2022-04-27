import { createWatcherRequest } from "../../../lib/services/request"

export const config = {
  // api: {
  //   bodyParser: false,
  // },
}

export default async function handler(req, res) {
  console.log(req)
  // insert request data to database
  await createWatcherRequest(req.query.id, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    cookies: req.cookies,
  })
  // emit event
  res.socket.server.io.emit(req.query.id, req.method)
  res.status(200).send("OK")
}