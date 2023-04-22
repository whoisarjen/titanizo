import BagContent from './BagContent'
import { getData } from '@/utils/api.utils'

type GetData = {
    data: Provider[]
    meta: Meta
}

const Bag = async () => {
    const providers = await getData<GetData>(
        `/providers?populate[0]=provider_options`
    )

    return <BagContent providers={providers.data} />
}

export default Bag
