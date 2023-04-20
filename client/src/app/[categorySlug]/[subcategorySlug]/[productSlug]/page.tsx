import { getData } from '@/utils/api.utils'
import Image from 'next/image'

type GetData = {
    data: Product
    meta: Meta
}

interface ProductSlugProps {
    params: {
        productSlug: string
    }
}

export default async function ProductSlug({
    params: { productSlug },
}: ProductSlugProps) {
    const product = await getData<GetData>(
        `/products/${productSlug.substring(
            0,
            productSlug.indexOf('--')
        )}?populate=*`
    )

    const { name, description } = product.data.attributes

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-center">
                <Image
                    src="/lazienkaPlaceholder.jpg"
                    alt={name}
                    width={1024}
                    height={576}
                />
                <h1 className="flex flex-1 items-center justify-center text-4xl font-bold">
                    {name}
                </h1>
            </div>
            <div>{description}</div>
        </div>
    )
}
