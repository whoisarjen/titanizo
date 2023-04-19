import { getData } from "@/utils/utils.api"

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
    const response = await getData<GetData>(
        `/products/${productSlug.substring(
            0,
            productSlug.indexOf('--')
        )}?populate=*`
    )

    return (
        <div>
            <h1>Product</h1>
            {response.data.attributes.name}
        </div>
    )
}
