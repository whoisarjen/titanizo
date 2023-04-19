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
}>

type Category = DefaultDataWrapper<{
    name: string
    subcategories: {
        data: Subcategory[]
    }
}>

type Product = DefaultDataWrapper<{
    name: string
    subcategory: {
        data: Category
    }
}>

type Meta = {
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}
