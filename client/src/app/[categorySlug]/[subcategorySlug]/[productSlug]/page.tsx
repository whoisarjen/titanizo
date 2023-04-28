import { getAPI } from '@/utils/api.utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { formatPrice } from '@/utils/product.utils'
import { GridFeatures } from '@/components/GridFeatures'
import ButtonAddToBag from './ButtonAddToBag'
import { env } from '@/env/client.mjs'
import { Product as ProductDTS, WithContext } from 'schema-dts'
import { type Metadata } from 'next'

type GetData = {
    data: Product
    meta: Meta
}

interface ProductSlugProps {
    params: {
        productSlug: string
    }
}

const getProductId = (props: ProductSlugProps) =>
    props.params.productSlug.substring(
        0,
        props.params.productSlug.indexOf('--')
    )

async function getData(props: ProductSlugProps) {
    const productId = getProductId(props)

    const response = await getAPI<GetData>(`/products/${productId}?`, {
        'populate[0]': 'images',
        'populate[1]': 'manufacturer',
        'populate[2]': 'subcategories.category',
        'populate[3]': 'recommended_products.images',
        'populate[4]': 'recommended_products.subcategories.category',
    })

    return response
}

export async function generateMetadata(
    props: ProductSlugProps
): Promise<Metadata> {
    if (!getProductId(props)) {
        return {}
    }

    const product = await getData(props)

    return {
        title: `${product.data.attributes.name} - ${product.data.attributes.manufacturer.data.attributes.name}`,
        description: product.data.attributes.description,
        robots: 'index, follow',
        viewport: 'width=device-width, initial-scale=1',
        colorScheme: 'light',
    }
}

export default async function ProductSlug(props: ProductSlugProps) {
    if (!getProductId(props)) {
        return null
    }

    const product = await getData(props)

    const {
        name,
        description,
        gross_price,
        collection,
        manufacturer,
        manufacturer_id,
        recommended_products,
        images,
        features,
    } = product.data.attributes

    // https://www.npmjs.com/package/schema-dts
    const jsonLd: WithContext<ProductDTS> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image: images?.data?.[0]?.attributes?.url || '',
    }

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="mt-4 flex w-full flex-col items-center">
                <div className="flex w-full flex-col justify-stretch md:flex-row">
                    <div className="bg-red hidden flex-1 grid-cols-2 gap-4 md:grid">
                        {images?.data?.slice(0, 8).map((image) => (
                            <div
                                key={image.id}
                                className="relative aspect-square"
                            >
                                <Image
                                    src={`${env.NEXT_PUBLIC_SERVER_ADDRESS}${image.attributes.formats.medium?.url || ''}`}
                                    alt="Zdjecie produktowe"
                                    fill
                                    className="object-cover"
                                ></Image>
                            </div>
                        ))}
                    </div>
                    <div className="block aspect-square flex-1 md:hidden">
                        {images?.data?.slice(0, 1).map((image) => (
                            <div
                                key={image.id}
                                className="relative aspect-square"
                            >
                                <Image
                                    src={`${env.NEXT_PUBLIC_SERVER_ADDRESS}${image.attributes.formats.small?.url || ''}`}
                                    alt="Zdjecie produktowe"
                                    fill
                                    className="object-cover"
                                ></Image>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1">
                        <div className="sticky top-[110px] px-1 pb-10 md:px-4">
                            <div>
                                {collection && (
                                    <span className=" block tracking-tight text-black/70">
                                        Kolekcja produktów{' '}
                                        <span className="text-lg font-bold text-black/80">
                                            {
                                                manufacturer?.data?.attributes
                                                    ?.name
                                            }{' '}
                                            {collection}
                                        </span>
                                    </span>
                                )}
                                <div className="my-3 flex flex-col items-center justify-between gap-3 md:flex-row md:gap-0 ">
                                    <h1 className="flex text-4xl font-bold tracking-tight">
                                        {name}
                                    </h1>
                                    <span className="md:text-none text-right text-3xl font-bold tracking-tighter">
                                        {formatPrice(gross_price)}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between tracking-tight text-black/70">
                                    {manufacturer?.data?.attributes?.name && (
                                        <span className="block">
                                            Producent:{' '}
                                            {manufacturer.data.attributes.name}
                                        </span>
                                    )}
                                    {manufacturer_id && (
                                        <span className="block">
                                            Kod producenta: {manufacturer_id}
                                        </span>
                                    )}
                                </div>
                                <div className="prose mt-4">
                                    <ReactMarkdown
                                        children={description || ''}
                                    />
                                </div>
                                <ButtonAddToBag product={product.data} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex w-full max-w-7xl flex-col place-content-evenly gap-6 md:flex-row">
                <Image
                    src="/lazienkaPlaceholder.jpg"
                    alt={name}
                    width={800}
                    height={450}
                />
                <div className="flex flex-1 flex-col justify-evenly gap-3">
                    <h1 className="flex text-4xl font-bold">{name}</h1>
                    {manufacturer_id && (
                        <div>Kod produktu: {manufacturer_id}</div>
                    )}
                    <div>
                        {formatPrice(gross_price)}
                    </div>
                    <div className="item-center flex flex-col">
                        <p>Wykończenie: chrom</p>
                        <p>Kształt: półokrągły</p>
                        <p>Szerokość [mm]: 900</p>
                        <p>Długość [mm]: 900</p>
                        <p>Wysokość [mm]: 1850</p>
                        <p>Wykończenie szkła: transparentne</p>
                        <p>Grubość szkła hartowanego [mm]: 5</p>
                    </div>
                    <div className="text-sm">
                        Zdjęcia mają charakter poglądowy i nie stanowią oferty w
                        rozumieniu prawa.
                    </div>
                    <div>
                        <ButtonAddToBag product={product.data} />
                    </div>
                </div>
            </div> */}

                <div className="flex w-full items-start justify-evenly">
                    {recommended_products.data.slice(0, 5).map((product) => (
                        <ProductBoxSmall key={product.id} product={product} />
                    ))}
                </div>
                <GridFeatures features={features} />
            </div>
        </section>
    )
}
