import { getProductHref } from '@/utils/product.utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProductBoxSmallProps {
    product: Product,
    className?: string
}

export const ProductBoxSmall = ({ product, className }: ProductBoxSmallProps) => {
    return (
        <Link
            href={getProductHref(product)}
            className={`flex relative w-full max-w-md md:max-w-sm flex-col items-center  gap-4 p-4 shadow ${className}`}
        >
            <div className='w-3/5 aspect-square relative'>
                <Image
                    src={product.attributes.images[0]?.src}
                    alt={product.attributes.name}
                    fill
                    className="object-contain"
                />
            </div>
            <h2 className="font-bold block">{product.attributes.name}</h2>
        </Link>
    )
}
