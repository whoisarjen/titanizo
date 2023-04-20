import { type Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'

interface ProductBoxSmallProps {
    href: Url
    product: Product,
    className?: string
}

export const ProductBoxSmall = ({ href, product, className }: ProductBoxSmallProps) => {
    return (
        <Link
            href={href}
            className={`flex relative w-full max-w-md md:max-w-sm flex-col items-center  gap-4 p-4 shadow ${className}`}
        >
            <div className='w-3/5 aspect-square relative'>
                <Image
                    src="https://media.deante.pl/w300/BATERIE/Baterie%20%C5%82azienkowe/SILIA/BQS_N20M.jpg"
                    alt={product.attributes.name}
                    fill
                    className="object-contain"
                />
            </div>
            <h2 className="font-bold block">{product.attributes.name}</h2>
            {/* <h3 className="">{product.attributes.description}</h3> */}
        </Link>
    )
}
