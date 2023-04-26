import { getProductHref } from '@/utils/product.utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProductBoxSmallProps {
    product: Product
    className?: string
}

export const ProductBoxSmall = ({
    product,
    className,
}: ProductBoxSmallProps) => {
    return (
        <Link
            href={getProductHref(product)}
            className={`relative flex w-full max-w-md flex-col items-center gap-4 p-4 shadow md:max-w-sm ${className}`}
        >
            <div className="relative aspect-square w-3/5">
                <Image
                    src={product.attributes.images[0]?.src}
                    alt={product.attributes.name}
                    fill
                    className="object-contain"
                />
            </div>
            <h2 className="block font-bold">{product.attributes.name}</h2>
        </Link>
    )
}
