'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext, useMemo } from 'react'
import { uniqBy } from 'lodash'
import Image from 'next/image'
import { formatPrice, getProductHref } from '@/utils/product.utils'
import Link from 'next/link'

const uniqueBagMapping = (bag: Product[]) => (product: Product) => ({
    ...product,
    quantity: bag.filter(({ id }) => id === product.id).length,
})

const BagContent = () => {
    const { bag, removeProductFromBag } = useContext(BagContext)

    const preparedBag = useMemo(() => {
        const uniqueBag = uniqBy(bag, 'id')
        const uniqueBagWithQuanitity = uniqueBag.map(uniqueBagMapping(bag))

        return uniqueBagWithQuanitity
    }, [bag.length])

    return (
        <div className="flex flex-1 flex-col divide-y gap-6">
            <div className="flex flex-1 flex-col gap-6">
                <h1 className="text-xl font-bold">Koszyk ({bag.length}.art)</h1>
                <div className="flex flex-1 flex-col divide-y">
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
                                    <Link
                                        className="font-bold"
                                        href={getProductHref(product)}
                                    >
                                        {product.attributes.name}
                                    </Link>
                                    <div>DARTED - Chinosy - beige</div>
                                    <div>Kolor: beige</div>
                                    <div>Rozmiar: 40</div>
                                    <button
                                        onClick={() =>
                                            removeProductFromBag(product)
                                        }
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
            </div>
            <div className="flex flex-1 flex-col gap-6 pt-6">
                <h1 className="text-xl font-bold">Adres dostawy</h1>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="input" />
                <label htmlFor="name">Imię</label>
                <input id="name" name="name" type="text" className="input" />
                <label htmlFor="surname">Nazwisko</label>
                <input id="surname" name="surname" type="text" className="input" />
                <label htmlFor="country">Kraj</label>
                <input id="country" name="country" type="text" className="input" disabled value="Polska" />
                <label htmlFor="postcode">Kod pocztowy</label>
                <input id="postcode" name="postcode" type="text" className="input" />
                <label htmlFor="town">Miasto</label>
                <input id="town" name="town" type="text" className="input" />
                <label htmlFor="address">Ulica</label>
                <input id="address" name="address" type="text" className="input" />
                <label htmlFor="house">Nr domu / lokalu</label>
                <input id="house" name="house" type="text" className="input" />
                <label htmlFor="telephone">Telefon</label>
                <input id="telephone" name="telephone" type="tel" className="input" />
            </div>
            <div className="flex flex-1 flex-col gap-6 pt-6">
                <h1 className="text-xl font-bold">Dostawa</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>
    )
}

export default BagContent
