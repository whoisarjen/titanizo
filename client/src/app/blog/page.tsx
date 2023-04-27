import { Pagination } from '@/components/Pagination'
import { env } from '@/env/client.mjs'
import { getAPI, transformObjectToPathname } from '@/utils/api.utils'
import Image from 'next/image'
import Link from 'next/link'

type GetData = {
    data: Post[]
    meta: Meta
}

interface BlogProps {
    searchParams: {
        page: string
    }
}

const Blog = async ({ searchParams: { page = '1' } }: BlogProps) => {
    const posts = await getAPI<GetData>('/posts?', {
        'populate': '*',
        'pagination[page]': page,
        'pagination[pageSize]':
            env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
    })

    return (
        <div className="flex w-full max-w-7xl mx-auto gap-3 m-3">
            {posts.data.map((post) => (
                <Link
                    key={post.id}
                    className="flex flex-row items-center gap-3"
                    href={`/blog${transformObjectToPathname(post)}`}
                >
                <Image
                    src={`${env.NEXT_PUBLIC_SERVER_ADDRESS}${post.attributes.image.data.attributes.formats.thumbnail.url}`}
                    height={post.attributes.image.data.attributes.formats.thumbnail.height}
                    width={post.attributes.image.data.attributes.formats.thumbnail.width}
                    alt={post.attributes.image.data.attributes.formats.thumbnail.caption || ''}
                />
                    {post.attributes.title}
                </Link>
            ))}
            <Pagination meta={posts.meta} defaultHref={'/blog'} />
        </div>
    )
}

export default Blog
