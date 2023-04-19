type DefaultDataWrapper<Attributes> = {
    id: number
    attributes: Attributes & {
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

type Subcategory = DefaultDataWrapper<{
    name: string
    description?: string
    category: {
        data: Category
    }
    products: {
        data: Product[]
    }
}>

type Category = DefaultDataWrapper<{
    name: string
    description?: string
    subcategories: {
        data: (Omit<Subcategory, 'attributes'> & {
            attributes: Omit<Subcategory['attributes'], 'category'>
        })[]
    }
}>

type Product = DefaultDataWrapper<{
    name: string
    description?: string
}>

type Meta = {
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}
