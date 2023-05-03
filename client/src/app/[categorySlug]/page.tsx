import { getAPI } from '@/utils/api.utils'
import { env } from '@/env/client.mjs'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Pagination } from '@/components/Pagination'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { type Metadata } from 'next'

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

const getCategoryId = (props: CategorySlugProps) =>
    props.params.categorySlug.substring(
        0,
        props.params.categorySlug.indexOf('--')
    )

async function getData(props: CategorySlugProps) {
    const categoryId = getCategoryId(props)

    const response = await Promise.all([
        getAPI<GetCategory>(`/categories/${categoryId}`),
        getAPI<GetProducts>('/products?', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories',
            'populate[3]': 'subcategories.category',
            'filters[subcategories][category][id][$eq]': categoryId,
            'pagination[page]': props.searchParams.page || '1',
            'pagination[pageSize]':
                env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
        }),
    ])

    return response
}

export async function generateMetadata(
    props: CategorySlugProps
): Promise<Metadata> {
    if (!getCategoryId(props)) {
        return {}
    }

    const [category] = await getData(props)

    return {
        title: category.data.attributes.name,
        description: category.data.attributes.description,
        robots: 'index, follow',
        viewport: 'width=device-width, initial-scale=1',
        colorScheme: 'light',
    }
}

export default async function CategorySlug(props: CategorySlugProps) {
    if (!getCategoryId(props)) {
        return null
    }

    const [category, products] = await getData(props)

    const defaultHref = `/${props.params.categorySlug}`

    return (
        <div className="mx-auto flex w-full container flex-col gap-6 p-6">
            <h1 className="text-center text-4xl">
                {category.data.attributes.name}
            </h1>
            <h2>{category.data.attributes.description}</h2>
            <Breadcrumb defaultHref={defaultHref} />
            <div className="grid grid-cols-2 lg:grid-cols-4 place-items-stretch gap-6 gap-y-8 xl:grid-cols-6">
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
    )
}
