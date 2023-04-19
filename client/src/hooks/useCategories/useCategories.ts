import { useFetch } from "../useFetch"

interface UseCategoriesResponse {
    data: Category[]
    meta: Meta
}

export const useCategories = async (): Promise<UseCategoriesResponse> => {
    const { get } = useFetch()
    const response = await get('/categories?populate=*')
    console.log({ response })
    return response
}
