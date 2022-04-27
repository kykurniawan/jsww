import { Server as ServerIO } from "socket.io"

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server
    const io = new ServerIO(httpServer, {
      path: '/api/socket'
    })
    res.socket.server.io = io
  }
  res.end()
}