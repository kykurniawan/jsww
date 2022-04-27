import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "../lib/fetcher"

export const useWatchers = (userId) => {
  const { data, error } = useSWR('/api/watchers?userId=' + userId, fetcher)
  const { mutate } = useSWRConfig()
  return {
    watchers: data?.data.watchers,
    loading: !error && !data,
    error: error,
    mutateWatchers: () => {
      mutate('/api/watchers?userId=' + userId)
    }
  }
}

export const useWatcher = (watcherId) => {
  const { data, error } = useSWR('/api/watchers/' + watcherId, fetcher)
  const { mutate } = useSWRConfig()
  return {
    watcher: data?.data.watcher,
    loading: !error && !data,
    error: error,
    mutateWatcher: () => {
      mutate('/api/watchers/' + watcherId)
    }
  }
}