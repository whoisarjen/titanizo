'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'


interface ButtonAddToBagProps {
    product: Product
}

const ButtonAddToBag = ({ product }: ButtonAddToBagProps) => {
    const { addItemToBeg } = useContext(BagContext)

    return (
        <button
            className="border-4 border-black text-black px-5 py-3 font-medium transition-colors hover:bg-black hover:text-white inline-block"
            onClick={() => addItemToBeg(product)}
        >
            Dodaj do koszyka
            <FontAwesomeIcon icon={faBagShopping}  className='ml-2'/>
        </button>
    )
}

export default ButtonAddToBag
