import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { env } from '@/env/client.mjs'
import { getAPI } from '@/utils/api.utils'
import { type Metadata } from 'next'
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

async function getData({
    params: { postSlug },
}: PostSlugProps) {
    const postId = postSlug.substring(0, postSlug.indexOf('--'))

    const response = await Promise.all([
        getAPI<GetPost>(`/posts/${postId}?`, {
            populate: '*',
        }),
        getAPI<GetProducts>('/products?', {
            'populate[0]': 'images',
            'populate[1]': 'manufacturer',
            'populate[2]': 'subcategories',
            'populate[3]': 'subcategories.category',
            'filters[subcategories][posts][id][$eq]': postId,
            'pagination[page]': '1',
            'pagination[pageSize]': '6',
        }),
    ])

    return response
}

export async function generateMetadata(
    props: PostSlugProps
): Promise<Metadata> {
    const [post] = await getData(props)

    return {
        title: post.data.attributes.title,
        description: post.data.attributes.content,
    }
}

const PostSlug = async (props: PostSlugProps) => {
    const [post, products] = await getData(props)

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
