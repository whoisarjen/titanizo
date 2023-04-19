type Subcategory = {
    id: number
    attributes: {
        name: string
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

type Category = {
    id: number
    attributes: {
        name: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        subcategories: {
            data: Subcategory[]
        }
    }
}

type Meta = {
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}
