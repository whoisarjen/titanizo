import slugify from 'slugify'

export const transformObjectToPathname = ({
    id,
    attributes,
}: DefaultDataWrapper<{ name?: string; title?: string }>): string => {
    return `/${id}--${slugify(attributes.name || attributes.title || '')}`
}

export const getAPI = async <GetData>(
    slug: string,
    object?: Record<string, string>
) => {
    let res = await fetch(
        `http://127.0.0.1:1337/api${slug}${new URLSearchParams(object)}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            next: {
                revalidate:
                    process.env.NODE_ENV === 'production'
                        ? (process.env
                              .NEXT_PUBLIC_API_REVALIDATE as unknown as number)
                        : 0,
            },
        }
    )

    return res.json() as GetData
}

export const postAPI = async (slug: string, data: object) => {
    let res = await fetch(`http://127.0.0.1:1337/api${slug}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({ data }),
    })

    return res
}
