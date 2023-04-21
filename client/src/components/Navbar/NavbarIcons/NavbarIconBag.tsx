'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const NavbarIconsBag = () => {
    const { bag } = useContext(BagContext)

    return (
        <Link
            href="/bag"
            className="p-2 text-white/75 transition-colors hover:text-white"
        >
            <FontAwesomeIcon icon={faCartShopping} className="text-white" />
            {!!bag.length && bag.length}
        </Link>
    )
}

export default NavbarIconsBag
