const TOKEN =
    '2eaaddc2fa98185b461ea8481ce4ce3fce226a0c76e56829c41fac0817e008ea6e2ad54e49a6b330e9b4c48da4c98e485d658f6afb487bab75ec308b9e226744a1eddea33fd0c999de5d8b63019515903d71cb8c859e4113f8a68ed845c89764ddf7f1b3725ca1b892dc13fa8f10ee145a55047aafe47763b3a1698373ee2378'

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
