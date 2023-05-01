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
    const isDisabled = !product.attributes.quantity

    return (
        <button
            className="button"
            disabled={isDisabled}
            onClick={() => addProductToBag(product)}
        >
            {isDisabled ? 'Produkt wyprzedany' : 'Dodaj do koszyka'}
            {!isDisabled && (
                <FontAwesomeIcon icon={faBagShopping} className="ml-2" />
            )}
        </button>
    )
}

export default ButtonAddToBag
