type DefaultDataWrapper<Attributes> = {
    id: number
    attributes: Attributes & {
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

type ProviderOption = DefaultDataWrapper<{
    name: string
    description?: string
    net_price: number
    gross_price: number
    height: number
    weight: number
    depth: number
    width: number
}>

type Provider = DefaultDataWrapper<{
    name: string
    provider_options: {
        data: ProviderOption[]
    }
}>

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

type Manufacturer = DefaultDataWrapper<{
    name: string
    description?: string
}>

type Product = DefaultDataWrapper<{
    name: string
    description?: string
    ean: null | string
    cn: null | string
    manufacturer_id: null | string
    warranty_in_months: number
    vat: number
    gross_price: number
    net_price: number
    promotion_price: number
    collection: null | string
    is_designed: null | boolean
    manufacturer: {
        data: Manufacturer
    }
    subcategory: {
        data: Subcategory
    }
    recommended_products: {
        data: Product[]
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
