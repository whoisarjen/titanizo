import slugify from 'slugify'

const makeAPICall = async <Response>(slug: string, query?: Record<string, string>) => {
    const config = useRuntimeConfig()
    return await fetch(`${config.public.STRAPI_BASE_URL}${slug}?${new URLSearchParams(query)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.public.STRAPI_PUBLIC_API_TOKEN}`,
        },
    }).then(res => res.json()) as Response
}

export default cachedEventHandler(async () => {
    const config = useRuntimeConfig()

    type GetCategories = {
        data: Category[]
        meta: Meta
    }
    const { data: responseCategories, } = await makeAPICall<GetCategories>('/categories', {
        'pagination[page]': '1',
        'pagination[pageSize]': '1000',
    })
    const categories = responseCategories.map(category => ({
        loc: `${config.public.siteUrl}/kategoria/${category.id}--${slugify(category.attributes.name, { lower: true, })}`,
        lastmod: category.attributes.updatedAt,
    }))

    type GetProducts = {
        data: Product[]
        meta: Meta
    }
    const responseProducts = await Promise.all([
        makeAPICall<GetProducts>('/products', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories.category',
            'populate[3]': 'recommended_products.images',
            'populate[4]': 'recommended_products.subcategories.category',
            'pagination[page]': '1',
            'pagination[pageSize]': '1000',
        }),
        makeAPICall<GetProducts>('/products', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories.category',
            'populate[3]': 'recommended_products.images',
            'populate[4]': 'recommended_products.subcategories.category',
            'pagination[page]': '2',
            'pagination[pageSize]': '1000',
        }),
        makeAPICall<GetProducts>('/products', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories.category',
            'populate[3]': 'recommended_products.images',
            'populate[4]': 'recommended_products.subcategories.category',
            'pagination[page]': '3',
            'pagination[pageSize]': '1000',
        }),
    ])
    const products = responseProducts.flatMap(response => response.data).map(product => ({
        loc: `${config.public.siteUrl}/produkt/${product.id}--${slugify(product.attributes.name, { lower: true, })}`,
        lastmod: product.attributes.updatedAt,
    }))

    type GetPosts = {
        data: Post[]
        meta: Meta
    }
    const { data: responsePosts, } = await makeAPICall<GetPosts>('/posts', {
        populate: '*',
        'pagination[page]': '1',
        'pagination[pageSize]': '1000',
    })
    const posts = responsePosts.map(post => ({
        loc: `${config.public.siteUrl}/blog/${post.id}--${slugify(post.attributes.title, { lower: true, })}`,
        lastmod: post.attributes.updatedAt,
    }))

    return [
        ...categories,
        ...products,
        ...posts,
    ]
    }, {
    name: 'sitemap-dynamic-urls',
    maxAge: 60 * 60 * 24,
})
