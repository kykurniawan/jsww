import { signIn } from 'next-auth/react'

function Signin() {
  return (
    <main>
      <div className="text-center py-5 container">
        <div className="mt-5">
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <button onClick={() => signIn('google')} className="btn-red">Sign in with Google</button>
            <button onClick={() => signIn('github')} className="btn-black">Sign in with GitHub</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signin