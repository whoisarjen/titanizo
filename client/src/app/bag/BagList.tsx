'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext } from 'react'

const BagList = () => {
    const { bag } = useContext(BagContext)

    return (
        <div>
            {bag.map((product) => (
                <h1>{product.attributes.name}</h1>
            ))}
        </div>
    )
}

export default BagList
