import { getData } from '@/utils/api.utils'
import { env } from '@/env/client.mjs'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Pagination } from '@/components/Pagination'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'

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
    searchParams: {
        page: string
    }
}

export default async function CategorySlug({
    params: { categorySlug },
    searchParams: { page = '1' },
}: CategorySlugProps) {
    const defaultHref = `/${categorySlug}`
    const categoryId = categorySlug.substring(0, categorySlug.indexOf('--'))

    if (!categoryId) {
        return null
    }

    const [category, products] = await Promise.all([
        getData<GetCategory>(`/categories/${categoryId}`),
        getData<GetProducts>('/products?', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories',
            'populate[3]': 'subcategories.category',
            'filters[subcategories][category][id][$eq]': categoryId,
            'pagination[page]': page,
            'pagination[pageSize]':
                env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
        }),
    ])

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
            <h1 className="text-center text-4xl">
                {category.data.attributes.name}
            </h1>
            <h2>{category.data.attributes.description}</h2>
            <Breadcrumb defaultHref={defaultHref} />
            <div className="flex flex-1 gap-6">
                <div className="flex w-96">123</div>
                <div className="flex flex-col gap-6 flex-1">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                        {products.data.map((product) => (
                            <ProductBoxSmall
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                    <Pagination
                        meta={products.meta}
                        defaultHref={defaultHref}
                    />
                </div>
            </div>
        </div>
    )
}
