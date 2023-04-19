import { getData } from '@/utils/api.utils'
import { transformObjectToPathname } from '@/utils/global.utils'
import Link from 'next/link'

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
                    href={`/${categorySlug}${transformObjectToPathname(
                        product.attributes.subcategory.data
                    )}${transformObjectToPathname(product)}`}
                >
                    {product.attributes.name}
                </Link>
            ))}
        </div>
    )
}
