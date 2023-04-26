import { env } from "@/env/client.mjs"

interface BreadcrumbProps {
    defaultHref: string
}

export const Breadcrumb = ({
    defaultHref,
}: BreadcrumbProps) => {
    const categories = defaultHref.split('/')
    const category = categories[1]
    const subcategory = categories[2] || ''

    return (
        <div className="flex flex-row gap-2">
            <div>
                {env.NEXT_PUBLIC_BRAND}
            </div>
            <div>{">"}</div>
            <div>
                {category.substring(category.indexOf('--') + 2, category.length)}
            </div>
            <div>{">"}</div>
            <div>
                {subcategory.substring(subcategory.indexOf('--') + 2, subcategory.length)}
            </div>
        </div>
    )
}
