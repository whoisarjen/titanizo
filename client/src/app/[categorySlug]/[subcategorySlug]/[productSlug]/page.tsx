import { getData } from '@/utils/api.utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { getProductHref, formatPrice } from '@/utils/product.utils'
import { GridFeatures } from '@/components/GridFeatures'
import ButtonAddToBag from './ButtonAddToBag'

type GetData = {
    data: Product
    meta: Meta
}

interface ProductSlugProps {
    params: {
        productSlug: string
    }
}

export default async function ProductSlug({
    params: { productSlug },
}: ProductSlugProps) {
    // TODO remove after they fix sw.js on initial render
    if (productSlug.indexOf('--') === -1) {
        return null
    }

    const product = await getData<GetData>(
        `/products/${productSlug.substring(
            0,
            productSlug.indexOf('--')
        )}?populate[0]=manufacturer&populate[1]=subcategories.category&populate[2]=recommended_products.subcategories.category`
    )

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

    return (
        <div className="mt-4 flex w-full flex-col items-center">
            <div className="flex w-full flex-col justify-stretch md:flex-row">
                <div className="bg-red hidden flex-1 grid-cols-2 gap-4 md:grid">
                    {images.slice(0, 8).map(({ src, type }) => (
                        <div className="relative aspect-square" key={src}>
                            <Image
                                src={src}
                                alt="Zdjecie produktowe"
                                fill
                                className={
                                    type === 'mainPhoto'
                                        ? 'object-contain'
                                        : 'object-cover'
                                }
                            ></Image>
                        </div>
                    ))}
                </div>
                <div className="block aspect-square flex-1 md:hidden">
                    {images.slice(0, 1).map(({ src, type }) => (
                        <div className="relative aspect-square" key={src}>
                            <Image
                                src={src}
                                alt="Zdjecie produktowe"
                                fill
                                className={
                                    type === 'mainPhoto'
                                        ? 'object-contain'
                                        : 'object-cover'
                                }
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
                                        {manufacturer?.data?.attributes?.name}{' '}
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
                                <ReactMarkdown children={description || ''} />
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
                {recommended_products.data.map((product) => (
                    <ProductBoxSmall
                        key={product.id}
                        href={getProductHref(product)}
                        product={product}
                    />
                ))}
            </div>
            <GridFeatures features={features} />
        </div>
    )
}
