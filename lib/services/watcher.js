import { ObjectId } from "mongodb";
import { clientPromise } from "../mongodb";

export async function getUserWatcher(watcherId) {
  const client = await clientPromise
  const database = client.db(process.env.MONGODB_DATABASE)
  const watcherCollection = database.collection("watchers")
  const watcher = await watcherCollection.findOne({
    _id: ObjectId(watcherId)
  })
  return watcher
}

export async function getUserWatchers(userId) {
  let userWatchers = []
  const client = await clientPromise
  const database = client.db(process.env.MONGODB_DATABASE)
  const watcherCollection = database.collection("watchers")
  const cursor = watcherCollection.find({ userId: ObjectId(userId) })
  await cursor.forEach(watcher => userWatchers.push(watcher))
  return userWatchers
}

export async function createUserWatcher(userId, watcherName) {
  const client = await clientPromise
  const database = client.db(process.env.MONGODB_DATABASE)
  const watcherCollection = database.collection("watchers")
  const watcher = await watcherCollection.insertOne({
    name: watcherName,
    userId: ObjectId(userId)
  })
  return watcher
}

export async function deleteUserWatcher(userId, watcherId) {
  const client = await clientPromise
  const database = client.db(process.env.MONGODB_DATABASE)
  const watcherCollection = database.collection("watchers")
  const result = await watcherCollection.deleteOne({
    _id: ObjectId(watcherId),
    userId: ObjectId(userId)
  })

  if (result.deletedCount === 1) return true
  return false
}