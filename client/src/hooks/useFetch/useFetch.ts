const TOKEN =
    '***REDACTED***'

export const useFetch = () => {
    const get = async (slug: string) =>
        await fetch(`http://127.0.0.1:1337/api${slug}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            next: {
                revalidate: 10,
            },
        })
            .then(async (response) => await response.json())
            .catch((err) => console.log(err)) // TODO Save this somewhere, maybe Redis?

    return {
        get,
    }
}
