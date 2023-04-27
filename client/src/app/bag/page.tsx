import BagContent from './BagContent'
import { getAPI } from '@/utils/api.utils'

type GetDataProviders = {
    data: Provider[]
    meta: Meta
}

type GetDataPayments = {
    data: Payment[]
    meta: Meta
}

const Bag = async () => {
    const [providers, payments] = await Promise.all([
        getAPI<GetDataProviders>(
            `/providers?populate[0]=provider_options`
        ),
        getAPI<GetDataPayments>(
            `/payments`
        ),
    ])

    return <BagContent providers={providers.data} payments={payments.data} />
}

export default Bag
