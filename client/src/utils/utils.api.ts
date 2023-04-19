import { env } from '@/env/client.mjs'

export async function getData<GetData>(slug: string) {
    let res = await fetch(`http://127.0.0.1:1337/api${slug}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: {
            revalidate: 10,
        },
    })

    return res.json() as GetData
}
