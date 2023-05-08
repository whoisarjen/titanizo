import { getAPI, transformObjectToPathname } from '@/utils/api.utils'
import { MetadataRoute } from 'next'
import { getProductHref } from '@/utils/product.utils'

type GetProducts = {
    data: Product[]
    meta: Meta
}

type GetPosts = {
    data: Post[]
    meta: Meta
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [products, posts] = await Promise.all([
        getAPI<GetProducts>(`/products?`, {
            'populate[0]': 'subcategories.category',
            'pagination[pageSize]': '1000',
        }),
        getAPI<GetPosts>('/posts?', {
            'pagination[pageSize]': '1000',
        }),
    ])

    return [
        ...products.data.map(product => ({
            url: `${process.env.NEXT_PUBLIC_URL}${getProductHref(product)}`,
            lastModified: product.attributes.updatedAt,
        })),
        ...posts.data.map(post => ({
            url: `${process.env.NEXT_PUBLIC_URL}/blog${transformObjectToPathname(post)}`,
            lastModified: post.attributes.updatedAt,
        })),
    ]
}
