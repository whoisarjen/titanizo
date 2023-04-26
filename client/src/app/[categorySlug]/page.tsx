import { getData } from '@/utils/api.utils'
import { env } from '@/env/client.mjs'
import { CategoryLayout } from '@/containers/CategoryLayout'

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
            'populate[0]': 'manufacturer',
            'populate[1]': 'subcategories',
            'populate[2]': 'subcategories.category',
            'filters[subcategories][category][id][$eq]': categoryId,
            'pagination[page]': page,
            'pagination[pageSize]':
                env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
        }),
    ])

    return (
        <CategoryLayout
            products={products}
            category={category}
            defaultHref={defaultHref}
        />
    )
}
