import slugify from 'slugify'

export const transformObjectToPathname = ({
    id,
    attributes,
}: DefaultDataWrapper<{ name: string }>): string => {
    return `/${id}--${slugify(attributes.name)}`
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(price)
}

export const getProductHref = (product: Product): string => `
${transformObjectToPathname(product.attributes.subcategories.data[0].attributes.category.data)}
${transformObjectToPathname(product.attributes.subcategories.data[0])}
${transformObjectToPathname(product)}
`

