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
    setBag: (() => {}) as unknown as Dispatch<SetStateAction<Product[]>>,
}

export const BagContext = createContext(DEFAULT_VALUE)

interface BagContextProviderProps {
    children: React.ReactNode
}

function BagContextProvider({ children }: BagContextProviderProps) {
    const [bag, setBag] = useState<Product[]>([])
    const isClientSide = typeof window !== 'undefined'

    useEffect(() => {
        localStorage.setItem('bag', JSON.stringify(bag))
    }, [bag.length])

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
        <BagContext.Provider value={{ bag, setBag }}>
            {children}
        </BagContext.Provider>
    )
}

export default BagContextProvider
