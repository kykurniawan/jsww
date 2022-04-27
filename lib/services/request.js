import { ObjectId } from "mongodb";
import { clientPromise } from "../mongodb";

export async function getWatcherRequests(watcherId) {
  let watcherRequests = []
  const client = await clientPromise
  const database = client.db(process.env.MONGODB_DATABASE)
  const requestCollection = database.collection("requests")
  const cursor = requestCollection.find({ watcherId: ObjectId(watcherId) }, {
    sort: { "time": -1 }
  })
  await cursor.forEach(watcher => watcherRequests.push(watcher))
  return watcherRequests
}

export async function createWatcherRequest(watcherId, requestData) {
  const client = await clientPromise
  const database = client.db(process.env.MONGODB_DATABASE)
  const requestCollection = database.collection("requests")
  const request = await requestCollection.insertOne({
    data: requestData,
    time: (new Date()).toString(),
    watcherId: ObjectId(watcherId)
  })
  return request
}