import { getData } from '@/utils/api.utils'
import Link from 'next/link'
import slugify from 'slugify'

type GetData = {
    data: Product[]
    meta: Meta
}

interface SubcategorySlugProps {
    params: {
        categorySlug: string
        subcategorySlug: string
    }
}

export default async function SubcategorySlug({
    params: { categorySlug, subcategorySlug },
}: SubcategorySlugProps) {
    const response = await getData<GetData>(
        `/products?populate=*&filters[subcategory][id][$eq]=${subcategorySlug.substring(
            0,
            subcategorySlug.indexOf('--')
        )}`
    )

    return (
        <div>
            <h1>SubategorySlug</h1>
            <h2>Products for subcategory:</h2>
            {response.data.map((product) => (
                <Link
                    href={`/${categorySlug}/${subcategorySlug}/${
                        product.id
                    }--${slugify(product.attributes.name)}`}
                >
                    {product.attributes.name}
                </Link>
            ))}
        </div>
    )
}
