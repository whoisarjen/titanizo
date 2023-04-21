'use client'

import { createContext, useState, useEffect } from 'react'

const DEFAULT_VALUE = {
    bag: [] as Product[],
    addProductToBag: (product: Product) => {},
    removeProductFromBag: (product: Product) => {},
}

export const BagContext = createContext(DEFAULT_VALUE)

interface BagContextProviderProps {
    children: React.ReactNode
}

function BagContextProvider({ children }: BagContextProviderProps) {
    const [bag, setBag] = useState<Product[]>([])
    const isClientSide = typeof window !== 'undefined'

    const addProductToBag = (product: Product) => {
        setBag((state) => {
            const newBag = [product, ...state]
            localStorage.setItem('bag', JSON.stringify(newBag))

            return newBag
        })
    }

    const removeProductFromBag = (product: Product) => {
        setBag((state) => {
            const indexToFilter = state.findIndex(({ id }) => id === product.id)
            const newBag = state.filter((_, index) => index !== indexToFilter)
            localStorage.setItem('bag', JSON.stringify(newBag))

            return newBag
        })
    }

    useEffect(() => {
        if (isClientSide) {
            setBag(
                JSON.parse(
                    localStorage.getItem('bag') || '[]'
                ) as unknown as Product[]
            )
        }
    }, [isClientSide])

    return (
        <BagContext.Provider value={{ bag, addProductToBag, removeProductFromBag }}>
            {children}
        </BagContext.Provider>
    )
}

export default BagContextProvider
