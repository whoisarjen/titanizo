import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { getData } from '@/utils/api.utils'
import { getProductHref } from '@/utils/product.utils'

type GetData = {
    data: Subcategory
    meta: Meta
}

interface SubcategorySlugProps {
    params: {
        subcategorySlug: string
    }
}

export default async function SubcategorySlug({
    params: { subcategorySlug },
}: SubcategorySlugProps) {
    const { data } = await getData<GetData>(
        `/subcategories/${subcategorySlug.substring(
            0,
            subcategorySlug.indexOf('--')
        )}?populate[0]=products&populate[1]=products.subcategory&populate[2]=products.subcategory.category&populate[3]=products.manufacturer`
    )

    const { name, description, products } = data.attributes

    return (
        <div>
            <h1 className="text-center text-4xl">{name}</h1>
            <h2>{description}</h2>
            {products.data.map((product) => (
                <ProductBoxSmall
                    key={product.id}
                    product={product}
                    href={getProductHref(product)}
                />
            ))}
        </div>
    )
}
