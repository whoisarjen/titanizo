'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext, useMemo } from 'react'
import { uniqBy } from 'lodash'
import Image from 'next/image'
import { formatPrice } from '@/utils/product.utils'

const uniqueBagMapping = (bag: Product[]) => (product: Product) => ({
    ...product,
    quantity: bag.filter(({ id }) => id === product.id).length,
})

const BagList = () => {
    const { bag, removeProductFromBag, addProductToBag } =
        useContext(BagContext)

    const preparedBag = useMemo(() => {
        const uniqueBag = uniqBy(bag, 'id')
        const uniqueBagWithQuanitity = uniqueBag.map(uniqueBagMapping(bag))

        return uniqueBagWithQuanitity
    }, [bag.length])

    return (
        <div className="flex flex-1">
            {preparedBag.map((product) => (
                <div
                    key={product.id}
                    className="flex flex-1 justify-center gap-3 p-3"
                >
                    <Image
                        src="https://media.deante.pl/org/ARANZE/RGB_SOMNIA_BOX_hiacynt_abelia_temisto_mokko.jpg"
                        alt="Hero placeholder"
                        className="object-cover"
                        width={96}
                        height={51}
                    />
                    <div className="flex flex-1 flex-row">
                        <div className="flex flex-1 flex-col items-start justify-between">
                            <h1 className="font-bold">
                                {product.attributes.name}
                            </h1>
                            <div>DARTED - Chinosy - beige</div>
                            <div>Kolor: beige</div>
                            <div>Rozmiar: 40</div>
                            <button
                                onClick={() => removeProductFromBag(product)}
                                className="text-gray-500"
                            >
                                Usuń
                            </button>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <div>x{product.quantity}</div>
                            <div className="font-bold">
                                {formatPrice(
                                    product.quantity *
                                        product.attributes.gross_price
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BagList
