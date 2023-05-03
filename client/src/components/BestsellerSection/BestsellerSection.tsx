import { getAPI } from '@/utils/api.utils'
import { ProductBoxSmall } from '../ProductBoxSmall'

type GetData = {
    data: Product[]
    meta: Meta
}

export const BestsellerSection = async () => {
    const { data } = await getAPI<GetData>(
        `/products?populate?populate[1]=subcategories.category`
    )

    return (
        <section className="flex flex-row flex-nowrap gap-4 overflow-x-auto overflow-y-hidden py-2 lg:grid lg:grid-cols-6">
            {[...data, ...data, ...data].map((product, id) => {
                return (
                    <ProductBoxSmall
                        key={id}
                        product={product}
                    />
                )
            })}
        </section>
    )
}

export default BestsellerSection
