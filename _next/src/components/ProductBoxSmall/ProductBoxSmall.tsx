import { formatPrice, getProductHref } from '@/utils/product.utils'
import Link from 'next/link'
import { WrappedImage } from '../WrappedImage'

interface ProductBoxSmallProps {
    product: Product
}

export const ProductBoxSmall = ({ product }: ProductBoxSmallProps) => {
    return (
        <Link
            href={getProductHref(product)}
            className="flex w-full flex-col gap-2 text-sm"
        >
            <div className="relative aspect-square w-full rounded-lg shadow">
                <WrappedImage
                    src={
                        product.attributes.images?.data?.[0]?.attributes.formats
                            .small?.url || ''
                    }
                    alt={product.attributes.name}
                    fill
                    className="object-contain p-8"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
            </div>
            <h2 className="truncate text-base font-bold">
                {product.attributes.name}
            </h2>
            <div className="line-clamp-2">{product.attributes.description}</div>
            <div className="font-bold">
                {formatPrice(product.attributes.gross_price)}
            </div>
        </Link>
    )
}
