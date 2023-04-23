export const getData = async <GetData>(slug: string) => {
    let res = await fetch(`http://127.0.0.1:1337/api${slug}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: {
            revalidate: 0,
        }
    })

    return res.json() as GetData
}

export const postData = async (slug: string, data: object) => {
    let res = await fetch(`http://127.0.0.1:1337/api${slug}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({ data }),
    })

    return res
}
