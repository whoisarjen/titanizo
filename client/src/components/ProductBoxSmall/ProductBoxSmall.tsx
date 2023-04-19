import { type Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'

interface ProductBoxSmallProps {
    href: Url
    product: Product
}

export const ProductBoxSmall = ({ href, product }: ProductBoxSmallProps) => {
    return (
        <Link
            href={href}
            className="flex w-full max-w-sm flex-col items-center justify-center gap-4 p-4 shadow"
        >
            <Image
                src="/lazienkaPlaceholder.jpg"
                alt={product.attributes.name}
                width={384}
                height={216}
            />
            <h2 className="font-bold">{product.attributes.name}</h2>
            <h3 className="">{product.attributes.description}</h3>
        </Link>
    )
}
