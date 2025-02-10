import { Link } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Header = () => {

    const { data: session } = useSession()
    const handleSignout = async () => {
        try {
            await signOut()
        } catch {

        }
    }
    return (
        <div>
            <button onClick={handleSignout}>SignOut</button>
            {session ? (
                <div>Welcome</div>
            ) : (
                <div>
                    <Link href='/login'>Login</Link>
                    <Link href='/register'>Login</Link>
                </div>
            )}
        </div>
    )
}

export default Header