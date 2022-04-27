import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "../lib/fetcher"

export const useRequests = (watcherId) => {
  const { data, error } = useSWR('/api/requests?watcherId=' + watcherId, fetcher)
  const { mutate } = useSWRConfig()
  return {
    requests: data?.data.requests,
    loading: !error && !data,
    error: error,
    mutateRequests: () => {
      mutate('/api/requests?watcherId=' + watcherId)
    }
  }
}