import { env } from '@/env/client.mjs'
import { getData } from '@/utils/api.utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

type GetData = {
    data: Post
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

    const post = await getData<GetData>(`/posts/${postId}?`, {
        populate: '*',
    })

    const { title, content, image } = post.data.attributes

    return (
        <div className="flex w-full flex-col">
            <Image
                src={`${env.NEXT_PUBLIC_SERVER_ADDRESS}${image.data.attributes.url}`}
                height={image.data.attributes.height}
                width={image.data.attributes.width}
                alt={image.data.attributes.caption || ''}
            />
            <div className="prose mx-auto mt-4 flex max-w-3xl flex-col">
                <h1>{title}</h1>
                <ReactMarkdown children={content || ''} />
            </div>
        </div>
    )
}

export default PostSlug
