type DefaultDataWrapper<Attributes> = {
    id: number
    attributes: Attributes & {
        updatedAt: string
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

type Payment = DefaultDataWrapper<{
    name: string
}>

type Category = DefaultDataWrapper<{
    name: string
    description?: string
    parent?: {
        data: Category | null
    }
    categories?: {
        data: Category[]
    }
    image?: {
        data: Image | null
    }
    isPopular: boolean
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
    categories?: {
        data: Category[]
    }
    recommended_products: {
        data: Product[]
    }
    images?: {
        data?: Image[]
    }
    features: {
        name: string
        description: string
        image: string
    }[]
    quantity?: number
}>

type ImageFormatsThumbnailOrMediumOrSmallOrLarge = {
    name: string
    hash: string
    ext: string
    mime: string
    path?: null
    width: number
    height: number
    size: number
    url: string
}

type ImageFormats = {
    thumbnail: ThumbnailOrMediumOrSmallOrLarge
    medium: ThumbnailOrMediumOrSmallOrLarge
    small: ThumbnailOrMediumOrSmallOrLarge
    large: ThumbnailOrMediumOrSmallOrLarge
}

type Image = DefaultDataWrapper<{
    name: string
    alternativeText?: null
    caption?: null
    width: number
    height: number
    formats: ImageFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl?: null
    provider: string
    provider_metadata?: null
    createdAt: string
    updatedAt: string
}>

type Post = DefaultDataWrapper<{
    title: string
    content: string
    image: {
        data: Image
    }
    categories?: {
        data: Category[]
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
