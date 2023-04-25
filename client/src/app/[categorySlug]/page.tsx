import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { getData } from '@/utils/api.utils'

type GetCategory = {
    data: Category
    meta: Meta
}

type GetProducts = {
    data: Product[]
    meta: Meta
}

interface CategorySlugProps {
    params: {
        categorySlug: string
    }
}

export default async function CategorySlug({
    params: { categorySlug },
}: CategorySlugProps) {
    const categoryId = categorySlug.substring(
        0,
        categorySlug.indexOf('--')
    )

    const [category, products] = await Promise.all([
        getData<GetCategory>(`/categories/${categoryId}`),
        getData<GetProducts>(
            '/products?',
            {
                "populate[0]": "manufacturer",
                "populate[1]": "subcategories",
                "populate[2]": "subcategories.category",
                "filters[subcategories][category][id][$eq]": categoryId,
                "pagination[page]": "1",
                "pagination[pageSize]": "10",
            },
        ),
    ])

    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <h1 className="text-center text-4xl">{category.data.attributes.name}</h1>
            <h2>{category.data.attributes.description}</h2>
            {products.data.map((product) => (
                <ProductBoxSmall
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}
