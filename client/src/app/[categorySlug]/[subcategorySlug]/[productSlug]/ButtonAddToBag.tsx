'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

interface ButtonAddToBagProps {
    product: Product
}

const ButtonAddToBag = ({ product }: ButtonAddToBagProps) => {
    const { addProductToBag } = useContext(BagContext)

    return (
        <button
            className="button"
            onClick={() => addProductToBag(product)}
        >
            Dodaj do koszyka
            <FontAwesomeIcon icon={faBagShopping} className="ml-2" />
        </button>
    )
}

export default ButtonAddToBag
