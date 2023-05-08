'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export const NavbarProfileButton = () => {
    const { data } = useSession()

    if (data) {
        return (
            <button
                onClick={() => signOut()}
                className="mx-4 cursor-pointer uppercase transition-colors hover:text-white"
            >
                Wyloguj się
            </button>
        )
    }

    return (
        <button
            onClick={() => signIn()}
            className="mx-4 cursor-pointer uppercase transition-colors hover:text-white"
        >
            Zaloguj się
        </button>
    )
}
