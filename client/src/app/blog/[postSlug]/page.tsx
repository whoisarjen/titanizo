import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { env } from '@/env/client.mjs'
import { getData } from '@/utils/api.utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

type GetPost = {
    data: Post
    meta: Meta
}

type GetProducts = {
    data: Product[]
    meta: Meta
}

interface PostSlugProps {
    params: {
        postSlug: string
    }
}

const PostSlug = async ({ params: { postSlug } }: PostSlugProps) => {
    const postId = postSlug.substring(0, postSlug.indexOf('--'))

    if (!postId) {
        return null
    }

    const [post, products] = await Promise.all([
        getData<GetPost>(`/posts/${postId}?`, {
            populate: '*',
        }),
        getData<GetProducts>('/products?', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories',
            'populate[3]': 'subcategories.category',
            'filters[subcategories][posts][id][$eq]': postId,
            'pagination[page]': '1',
            'pagination[pageSize]': '6',
        }),
    ])

    const { title, content, image } = post.data.attributes
    const { url, height, width, caption = '' } = image.data.attributes.formats.large

    return (
        <div className="flex w-full flex-col">
            <div className="prose mx-auto my-4 flex max-w-3xl flex-col">
                <Image
                    src={`${env.NEXT_PUBLIC_SERVER_ADDRESS}${url}`}
                    height={height}
                    width={width}
                    alt={caption}
                />
                <h1>{title}</h1>
                <ReactMarkdown children={content} />
            </div>
            <div className="flex w-full items-start justify-evenly">
                {products.data.map((product) => (
                    <ProductBoxSmall key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default PostSlug
