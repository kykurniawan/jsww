import Link from "next/link"
import { signOut } from 'next-auth/react'

function Navigation({ session }) {

    return (
        <>
            <nav id="navbar">
                <div className="container">
                    <Link href={'/'}>
                        <a className="brand">JSWW</a>
                    </Link>
                    <div className="links">
                        {(session) ?
                            <>
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="link">Sign Out</button>
                            </>
                            :
                            <>
                                <Link href={'/api/auth/signin'}>
                                    <a className="link">Sign In</a>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation