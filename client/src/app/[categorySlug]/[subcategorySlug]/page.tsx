import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Pagination } from '@/components/Pagination'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { env } from '@/env/client.mjs'
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
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories',
            'populate[3]': 'subcategories.category',
            'filters[subcategories][id][$eq]': subcategoryId,
            'pagination[page]': page,
            'pagination[pageSize]':
                env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
        }),
    ])

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
            <h1 className="text-center text-4xl">
                {subcategory.data.attributes.name}
            </h1>
            <h2>{subcategory.data.attributes.description}</h2>
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
