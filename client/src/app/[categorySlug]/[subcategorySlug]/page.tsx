import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { getData } from '@/utils/api.utils'

type GetSubcategory = {
    data: Subcategory
    meta: Meta
}

type GetProducts = {
    data: Product[]
    meta: Meta
}

interface SubcategorySlugProps {
    params: {
        subcategorySlug: string
    }
}

export default async function subcategoriesSlug({
    params: { subcategorySlug },
}: SubcategorySlugProps) {
    const subcategoryId = subcategorySlug.substring(
        0,
        subcategorySlug.indexOf('--')
    )

    const [subcategory, products] = await Promise.all([
        getData<GetSubcategory>(`/subcategories/${subcategoryId}`),
        getData<GetProducts>(
            '/products?',
            {
                "populate[0]": "manufacturer",
                "populate[1]": "subcategories",
                "populate[2]": "subcategories.category",
                "filters[subcategories][id][$eq]": subcategoryId,
                "pagination[page]": "1",
                "pagination[pageSize]": "10",
            },
        ),
    ])

    return (
        <div>
            <h1 className="text-center text-4xl">{subcategory.data.attributes.name}</h1>
            <h2>{subcategory.data.attributes.description}</h2>
            {products.data.map((product) => (
                <ProductBoxSmall
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}
