import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { getData } from '@/utils/api.utils'
import { transformObjectToPathname } from '@/utils/product.utils'

type GetCategory = {
    data: Category
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
    // TODO remove after they fix sw.js on initial render
    if (categorySlug.indexOf('--') === -1) {
        return null
    }

    const { data } = await getData<GetCategory>(
        `/categories/${categorySlug.substring(
            0,
            categorySlug.indexOf('--')
        )}?populate[subcategories][populate][0]=products`
    )

    const { name, description, subcategories } = data.attributes

    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <h1 className="text-center text-4xl">{name}</h1>
            <h2>{description}</h2>
            {subcategories.data.map((subcategory) => {
                const {
                    attributes: { products },
                } = subcategory

                return products.data.map((product) => (
                    <ProductBoxSmall
                        key={product.id}
                        product={product}
                        href={`${transformObjectToPathname(
                            data
                        )}${transformObjectToPathname(
                            subcategory
                        )}${transformObjectToPathname(product)}`}
                    />
                ))
            })}
        </div>
    )
}
