import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { Pagination } from '@/components/Pagination'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'

type CategoryProp = {
    data: Category | Subcategory
    meta: Meta
}

type ProductsProp = {
    data: Product[]
    meta: Meta
}

interface CategoryLayoutProps {
    category: CategoryProp
    products: ProductsProp
    defaultHref: string
}

export const CategoryLayout = ({
    category,
    products,
    defaultHref,
}: CategoryLayoutProps) => {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
            <h1 className="text-center text-4xl">
                {category.data.attributes.name}
            </h1>
            <h2>{category.data.attributes.description}</h2>
            <Breadcrumb defaultHref={defaultHref} />
            <div className="flex flex-1 gap-6">
                <div className="flex w-96 bg-red-500">123</div>
                <div className="flex flex-col gap-6">
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
