const TOKEN =
    '***REDACTED***'

export async function getData<GetData>(slug: string) {
    let res = await fetch(`http://127.0.0.1:1337/api${slug}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        next: {
            revalidate: 10,
        },
    })

    return res.json() as GetData
}
