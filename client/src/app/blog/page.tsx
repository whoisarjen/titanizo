import { Pagination } from '@/components/Pagination'
import { env } from '@/env/client.mjs'
import { getData, transformObjectToPathname } from '@/utils/api.utils'
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
    const posts = await getData<GetData>('/posts?', {
        populate: '*',
        'pagination[page]': page,
        'pagination[pageSize]':
            env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
    })

    return (
        <div>
            {posts.data.map((post) => (
                <Link
                    key={post.id}
                    href={`/blog${transformObjectToPathname(post)}`}
                >
                    {post.attributes.title}
                </Link>
            ))}
            <Pagination meta={posts.meta} defaultHref={'/blog'} />
        </div>
    )
}

export default Blog
