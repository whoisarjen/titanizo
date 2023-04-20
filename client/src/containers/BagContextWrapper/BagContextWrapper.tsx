'use client'
import BagContextProvider from './BagContext'

const BagContextWrapper = ({ children }: { children: React.ReactNode }) => {
    return <BagContextProvider>{children}</BagContextProvider>
}

export default BagContextWrapper
