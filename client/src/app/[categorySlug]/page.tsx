import { getData } from '@/utils/api.utils'
import Link from 'next/link'
import slugify from 'slugify'

type GetData = {
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
    const response = await getData<GetData>(
        `/products?populate=*&filters[subcategory][category][id][$eq]=${categorySlug.substring(
            0,
            categorySlug.indexOf('--')
        )}`
    )

    return (
        <div>
            <h1>CategorySlug</h1>
            <h2>Products for category:</h2>
            {response.data.map((product) => (
                <Link
                    href={`/${categorySlug}/${
                        product.attributes.subcategory.data.id
                    }--${slugify(
                        product.attributes.subcategory.data.attributes.name
                    )}/${product.id}--${slugify(product.attributes.name)}`}
                >
                    {product.attributes.name}
                </Link>
            ))}
        </div>
    )
}
