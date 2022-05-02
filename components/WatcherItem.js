import { EyeIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'

function WatcherItem({ watcher, handlers }) {
  const deleteWatcher = async () => {
    await handlers.delete(watcher)
  }
  return (
    <div className="border-2 rounded">
      <div className="px-4 py-3">
        <h4 className="text-lg text-gray-600">{watcher.name}</h4>
      </div>
      <hr />
      <div className="px-4 py-2 flex items-center justify-end gap-2">
        <button onClick={deleteWatcher} title="Delete">
          <TrashIcon className="h-5 w-5 text-red-600" />
        </button>
        <Link href={'/watchers/' + watcher._id}>
          <a title="View detail">
            <EyeIcon className="h-5 w-5 text-blue-500" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default WatcherItem