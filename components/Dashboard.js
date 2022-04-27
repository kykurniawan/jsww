import WatcherList from "./WatcherList"

function Dashboard({ session }) {
  return (
    <>
      <div className="container">
        <div className="py-10">
          <h1 className="text-xl text-gray-600 font-semibold">Hi, {session?.user.name}</h1>
          <h2 className="italic text-gray-600 font-light">You are logged in with {session?.user.email}</h2>
          <div className="mt-10">
            <WatcherList session={session} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard