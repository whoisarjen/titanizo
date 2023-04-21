'use client'
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type Dispatch,
    type SetStateAction,
} from 'react'

const DEFAULT_VALUE = {
    bag: [] as Product[],
    addItemToBeg: (product: Product) => {},
}

export const BagContext = createContext(DEFAULT_VALUE)

interface BagContextProviderProps {
    children: React.ReactNode
}

function BagContextProvider({ children }: BagContextProviderProps) {
    const [bag, setBag] = useState<Product[]>([])
    const isClientSide = typeof window !== 'undefined'

    const addItemToBeg = (product: Product) => {
        setBag((state) => {
            const newBeg = [product, ...state]
            localStorage.setItem('bag', JSON.stringify(newBeg))

            return newBeg
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
        <BagContext.Provider value={{ bag, addItemToBeg }}>
            {children}
        </BagContext.Provider>
    )
}

export default BagContextProvider
