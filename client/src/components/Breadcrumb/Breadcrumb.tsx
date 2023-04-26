import { env } from '@/env/client.mjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface BreadcrumbProps {
    defaultHref: string
}

export const Breadcrumb = ({ defaultHref }: BreadcrumbProps) => {
    const categories = defaultHref.split('/')
    const category = categories[1]
    const subcategory = categories[2] || ''

    return (
        <div className="flex flex-row items-center gap-2">
            <Link href="/">{env.NEXT_PUBLIC_BRAND}</Link>
            <FontAwesomeIcon icon={faArrowRight} />
            <Link href={`/${category}`}>
                {category
                    .substring(category.indexOf('--') + 2, category.length)
                    .replaceAll('-', ' ')}
            </Link>
            {subcategory && (
                <>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <Link href={`/${category}/${subcategory}`}>
                        {subcategory
                            .substring(
                                subcategory.indexOf('--') + 2,
                                subcategory.length
                            )
                            .replaceAll('-', ' ')}
                    </Link>
                </>
            )}
        </div>
    )
}
