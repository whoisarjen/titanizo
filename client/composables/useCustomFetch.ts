export const useGetApi = async <Response>(slug: string, query?: Record<string, string>) => {
    const config = useRuntimeConfig()
    return await useFetch<Response>(`${config.public.STRAPI_BASE_URL}${slug}?${new URLSearchParams(query)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${config.public.STRAPI_PUBLIC_API_TOKEN}`,
        },
    })
}
