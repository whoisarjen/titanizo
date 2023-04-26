import { env } from '@/env/client.mjs'
import { getData } from '@/utils/api.utils'
import { CategoryLayout } from '@/containers/CategoryLayout'

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
        categorySlug: string
        subcategorySlug: string
    }
    searchParams: {
        page: string
    }
}

export default async function SubcategoriesSlug({
    params: { categorySlug, subcategorySlug },
    searchParams: { page = '1' },
}: SubcategorySlugProps) {
    const defaultHref = `/${categorySlug}/${subcategorySlug}`
    const subcategoryId = subcategorySlug.substring(
        0,
        subcategorySlug.indexOf('--')
    )

    if (!subcategoryId) {
        return null
    }

    const [subcategory, products] = await Promise.all([
        getData<GetSubcategory>(`/subcategories/${subcategoryId}`),
        getData<GetProducts>('/products?', {
            'populate[0]': 'manufacturer',
            'populate[1]': 'subcategories',
            'populate[2]': 'subcategories.category',
            'filters[subcategories][id][$eq]': subcategoryId,
            'pagination[page]': page,
            'pagination[pageSize]':
                env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
        }),
    ])

    return (
        <CategoryLayout
            products={products}
            category={subcategory}
            defaultHref={defaultHref}
        />
    )
}
