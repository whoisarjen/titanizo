'use client'

import { createContext, useState, useEffect } from 'react'

const DEFAULT_VALUE = {
    bag: [] as Product[],
    grossPriceOfBag: 0,
    addProductToBag: (product: Product) => {},
    removeProductFromBag: (product: Product) => {},
    removeAllProductsFromBad: () => {},
}

export const BagContext = createContext(DEFAULT_VALUE)

interface BagContextProviderProps {
    children: React.ReactNode
}

function BagContextProvider({ children }: BagContextProviderProps) {
    const [bag, setBag] = useState<Product[]>([])
    const isClientSide = typeof window !== 'undefined'

    const grossPriceOfBag = bag.reduce(
        (prev, product) => prev + product.attributes.gross_price,
        0
    )

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

    const removeAllProductsFromBad = () => {
        const newBag: Product[] = []

        localStorage.setItem('bag', JSON.stringify(newBag))
        setBag(newBag)
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
        <BagContext.Provider value={{ bag, grossPriceOfBag, addProductToBag, removeProductFromBag, removeAllProductsFromBad }}>
            {children}
        </BagContext.Provider>
    )
}

export default BagContextProvider
