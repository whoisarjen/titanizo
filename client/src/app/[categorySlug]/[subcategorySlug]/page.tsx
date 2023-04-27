import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Pagination } from '@/components/Pagination'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { env } from '@/env/client.mjs'
import { getAPI } from '@/utils/api.utils'
import { type Metadata } from 'next'

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

const getSubcategoryId = (props: SubcategorySlugProps) =>
    props.params.subcategorySlug.substring(
        0,
        props.params.subcategorySlug.indexOf('--')
    )

async function getData(props: SubcategorySlugProps) {
    const subcategoryId = getSubcategoryId(props)

    const response = await Promise.all([
        getAPI<GetSubcategory>(`/subcategories/${subcategoryId}`),
        getAPI<GetProducts>('/products?', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories',
            'populate[3]': 'subcategories.category',
            'filters[subcategories][id][$eq]': subcategoryId,
            'pagination[page]': props.searchParams.page || '1',
            'pagination[pageSize]':
                env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
        }),
    ])

    return response
}

export async function generateMetadata(
    props: SubcategorySlugProps
): Promise<Metadata> {
    if (!getSubcategoryId(props)) {
        return {}
    }

    const [subcategory] = await getData(props)

    return {
        title: subcategory.data.attributes.name,
        description: subcategory.data.attributes.description,
        robots: 'index, follow',
        viewport: 'width=device-width, initial-scale=1',
        colorScheme: 'light',
    }
}

export default async function SubcategoriesSlug(props: SubcategorySlugProps) {
    if (!getSubcategoryId(props)) {
        return null
    }

    const [subcategory, products] = await getData(props)

    const defaultHref = `/${props.params.categorySlug}/${props.params.subcategorySlug}`

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
            <h1 className="text-center text-4xl">
                {subcategory.data.attributes.name}
            </h1>
            <h2>{subcategory.data.attributes.description}</h2>
            <Breadcrumb defaultHref={defaultHref} />
            <div className="flex flex-1 gap-6">
                <div className="flex w-96">123</div>
                <div className="flex flex-1 flex-col gap-6">
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
