import { getProductHref } from '@/utils/product.utils'
import Link from 'next/link'
import { WrappedImage } from '../WrappedImage'

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
                <WrappedImage
                    src={product.attributes.images?.data?.[0]?.attributes.formats.small?.url || ''}
                    alt={product.attributes.name}
                    fill
                    className="object-contain"
                    loading='lazy'
                />
            </div>
            <h2 className="block font-bold">{product.attributes.name}</h2>
        </Link>
    )
}
