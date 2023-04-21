'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { formatPrice } from '@/utils/product.utils'

const BagSidebar = () => {
    const { bag } = useContext(BagContext)

    const grossPrice = bag.reduce((prev, product) => prev + product.attributes.gross_price, 0)
    const delieverPrice = 10.49

    return (
        <div className="w-full max-w-sm flex flex-col gap-6">
            <div className="text-xl font-bold">Do zapłaty</div>
            <div className="flex justify-between flex-1">
                <div>Wartość produktów</div>
                <div>{formatPrice(grossPrice)}</div>
            </div>
            <div className="flex justify-between flex-1">
                <div>Dostawa</div>
                <div>{formatPrice(delieverPrice)}</div>
            </div>
            <div className="flex justify-between flex-1 border-t-2 pt-6">
                <div>Do zapłaty (w tym VAT)</div>
                <div>{formatPrice(grossPrice + delieverPrice)}</div>
            </div>
            <Link
                href="/checkout"
                className="button w-full"
            >
                Przejdź do kasy
            </Link>
        </div>
    )
}

export default BagSidebar