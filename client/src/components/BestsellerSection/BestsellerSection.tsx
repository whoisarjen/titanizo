import { getData } from '@/utils/api.utils'
import { ProductBoxSmall } from '../ProductBoxSmall'
import { getProductHref } from '@/utils/product.utils'

type GetData = {
    data: Product[]
    meta: Meta
}

export const BestsellerSection = async () => {
    const { data } = await getData<GetData>(
        `/products?populate?populate[1]=subcategory.category`
    )

    return (
        <section className="flex flex-row flex-nowrap gap-4 overflow-x-auto overflow-y-hidden py-2 lg:grid lg:grid-cols-6">
            {[...data, ...data, ...data].map((product, id) => {
                return (
                    <ProductBoxSmall
                        className="min-w-[40vw] md:min-w-[30vw] lg:min-w-0"
                        key={id}
                        href={getProductHref(product)}
                        product={product}
                    />
                )
            })}
        </section>
    )
}

export default BestsellerSection
