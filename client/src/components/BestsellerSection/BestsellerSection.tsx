import { getData } from "@/utils/api.utils"
import { ProductBoxSmall } from "../ProductBoxSmall"
import { transformObjectToPathname } from "@/utils/product.utils"


type GetData = {
    data: Product[]
    meta: Meta
}

export const BestsellerSection = async () => {
    const { data } = await getData<GetData>(
        `/products?populate?populate[0]=currency&populate[1]=subcategory.category`
    )

    return (
        <section className="lg:grid lg:grid-cols-6 flex flex-row overflow-x-auto overflow-y-hidden flex-nowrap gap-4 py-2">
            {[...data, ...data, ...data].map((product, id) => {
                return <ProductBoxSmall className="min-w-[40vw] md:min-w-[30vw] lg:min-w-0" key={id}  href={`${transformObjectToPathname(
                    product.attributes.subcategory.data.attributes
                        .category.data
                )}${transformObjectToPathname(
                    product.attributes.subcategory.data
                )}${transformObjectToPathname(product)}`}
                product={product} />
            })}
        </section>
    )
}

export default BestsellerSection
