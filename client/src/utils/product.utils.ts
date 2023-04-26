import { transformObjectToPathname } from "./api.utils"

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(price)
}

export const getProductHref = (product: Product): string => `
${transformObjectToPathname(product.attributes.subcategories.data[0].attributes.category.data)}
${transformObjectToPathname(product.attributes.subcategories.data[0])}
${transformObjectToPathname(product)}
`

