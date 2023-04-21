import { getData } from '@/utils/api.utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { getProductHref, formatPrice } from '@/utils/product.utils'
import ButtonAddToBag from './ButtonAddToBag'
import { GridFeatures } from '@/components/GridFeatures'

type GetData = {
    data: Product
    meta: Meta
}

interface ProductSlugProps {
    params: {
        productSlug: string
    }
}

const features = [
    {
        name: 'Design pełen piękna i harmonii',
        description:
            'Delikatna, minimalistyczna, a przede wszystkim piękna i intrygująca – taka właśnie jest linia Arnika, inspirowana duńskim stylem hygge. Seria Arnika łączy funkcjonalność i inspirację łagodnymi, występującymi w przyrodzie kształtami. ',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/ARNIKA/arnika-titanium-design.jpg',
    },
    {
        name: 'Różnorodność kolorów daje wiele możliwości aranżacji',
        description:
            'Ta perfekcyjna forma dostępna jest w wielu wykończeniach: klasycznym chromie, majestatycznym złocie, szlachetnej czerni i intrygującej głębokiej szarości - titanium.',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/ARNIKA/roznorodnosc-kolorow.jpg',
    },
    {
        name: 'Korpus baterii wykonany z najwyższej jakości mosiądzu',
        description: '',
        image: '',
    },
    {
        name: 'Aerator silikonowy ułatwiający usuwanie osadów wapiennych',
        description:
            'Silikonowy aerator napowietrza strumień wody, a jednocześnie daje możliwość łatwego usuwania osadu wapiennego - wystarczy przetrzeć palcem po jego silikonowych krawędziach. ',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/BATERIE/aerator-silikonowy-napowietrzajacy-strumien-wody-ulatwiajacy-usuwanie-osadow.jpg',
    },
    {
        name: 'Bateria wyposażona w aerator napowietrzający strumień',
        description:
            'Bateria wyposażona została w aerator, dzięki któremu strumień wody jest doskonale napowietrzony i miękki. Rozwiązanie to poprawia komfort użytkowania, zarazem ograniczając zużycie wody, co przekłada się na niższe rachunki domowe. Zyskujesz też świadomość, że przyczyniasz się do dbania o naszą planetę. ',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/BATERIE/aerator_napowietrzajacy_v2.JPG',
    },
    {
        name: 'Wężyki przyłączeniowe w komplecie',
        description: '',
        image: '',
    },
    {
        name: 'Klasa przepływu Z (4-9 l/min) pozwala na zredukowanie zużycia wody',
        description:
            'Klasa przepływu Z oznacza, że w ciągu minuty przez baterię przepływa od 4 do 9 litrów wody. Strumień jest jednocześnie komfortowy w użytkowaniu, delikatny i miękki. To rozwiązanie idealnie sprawdzi się wszędzie tam, gdzie zwraca się uwagę na ekologiczną i ekonomiczną odpowiedzialność – czyli również w Twoim domu!',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/BATERIE/klasa-przeplywu-Z-4-9-l-min.jpg',
    },
    {
        name: 'W ofercie dedykowany środek bezpieczny dla czyszczonych powierzchni',
        description:
            'Użycie dedykowanych środków powoduje, że powierzchnie nie niszczą się i długo pozostają gładkie, ułatwiając kolejne sprzątanie. Specjalnie dobrany skład usuwa najczęściej spotykane zabrudzenia bardzo skutecznie. Z drugiej strony preparaty są delikatne dla danego typu nawierzchni (metal, granit, ceramika i inne), nie wchodząc z nimi w reakcje chemiczne. Preparaty są biodegradowalne i tym samym bezpieczne dla środowiska. Ze środkami do czyszczenia Deante utrzymanie nienagannego porządku będzie bardzo proste!',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/CHEMIA/srodek-chemiczny-bezpieczny-dla-czyszczonych-powierzchni.jpg',
    },
    {
        name: 'Innowacyjna wytrzymała i łatwa w czyszczeniu powłoka Titanium',
        description:
            'Grafitowostalowa powierzchnia armatury Deante TITANIUM jest efektem zastosowania innowacyjnej technologii. Stanowi spektakularny kompromis między szarością, ciemnym grafitem, czernią, a nawet delikatnym odcieniem brązu - idealna ozdoba każdej aranżacji wnętrza. Struktura powierzchni jest wytrzymała, łatwa w utrzymaniu w czystości i nie przyjmuje odcisków palców.',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/BATERIE/innowacyjna-powloka-titanium.jpg',
    },
    {
        name: 'Tylko najlepsze materiały, których jakość potwierdzamy badaniami w laboratorium',
        description: '',
        image: '',
    },
    {
        name: 'rekomendujemy dokupienie korka uniwersalnego w kolorze baterii',
        description: '',
        image: '',
    },
    {
        name: 'Pochylony korpus',
        description:
            'Pochylony korpus baterii sprawia, że woda kapiąca na wylewkę, od razu z niej spływa, nie pozostawiając nieestetycznego osadu. Dzięki temu jest łatwa do utrzymania w czystości i nieustannie zachwyca błyszczącym, chromowym wykończeniem.',
        image: 'https://media.deante.pl/decor/_MARKETING/WYROZNIKI/AGAWA/pochylony-korpus.jpg',
    },
]

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
        )}?populate[0]=manufacturer&populate[1]=subcategory.category&populate[2]=recommended_products.subcategory.category`
    )

    const photos = [
        { src: "https://media.deante.pl/decor/AKCESORIA%20%C5%81AZIENKOWE/ADR_N511.jpg", type: 'mainPhoto'},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_ADR_N511.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_ADR_N511_2.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_ADR_N511_3.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_KerriaPlus_nero_Brodzik_Arnika_Round.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_small_KerriaPlus_BXYZNEBT_odplyw_Round.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_small_KerriaPlus_nero_Arnika_nero_odplyw_Round.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_small_KerriaPlus_nero_BXY_NQAM_odplyw_Round.jpg", type: "decor"},
        { src: "https://media.deante.pl/decor/ARANZE/RGB_KTM_N11P%2C%20NAC_N1QK%2C%20KQR_T41B%2C%20ADR_N511%2C%20ADM_N622.jpg", type: "decor"},
    ]

    const {
        name,
        description,
        gross_price,
        collection,
        manufacturer,
        manufacturer_id,
        recommended_products,
    } = product.data.attributes

    return (
        <div className="flex w-full flex-col items-center mt-4">
            <div className="flex flex-col md:flex-row w-full justify-stretch">
                <div className='flex-1 bg-red grid-cols-2 gap-4 hidden md:grid'>
                    {
                        photos.slice(0, 8).map(photo => (
                            <div className='relative aspect-square' key={photo.src}>
                                <Image src={photo.src} alt="Zdjecie produktowe" fill className={photo.type === 'mainPhoto' ? 'object-contain' : 'object-cover'}></Image>
                            </div>
                        ))
                    }
                </div>
                <div className='flex-1 aspect-square block md:hidden'>
                    {
                        photos.slice(0, 1).map(photo => (
                            <div className='relative aspect-square' key={photo.src}>
                                <Image src={photo.src} alt="Zdjecie produktowe" fill className={photo.type === 'mainPhoto' ? 'object-contain' : 'object-cover'}></Image>
                            </div>
                        ))
                    }
                </div>
                <div className='flex-1'>
                    <div className='px-1 md:px-4 sticky top-[110px] pb-10'>
                        <div>
                            {collection && (
                                <span className=' block tracking-tight text-black/70'>Kolekcja produktów <span className='text-lg font-bold text-black/80'>{manufacturer?.data?.attributes?.name} {collection}</span></span>
                            )}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 my-3 ">
                                <h1 className="flex text-4xl font-bold tracking-tight">{name}</h1>
                                <span className='font-bold text-3xl tracking-tighter text-right md:text-none'>{formatPrice(gross_price)}</span>
                            </div>
                            <div className='flex flex-row justify-between tracking-tight text-black/70'>
                                {manufacturer?.data?.attributes?.name && (
                                    <span className='block'>Producent: {manufacturer.data.attributes.name}</span>
                                )}
                                {manufacturer_id && (
                                    <span className='block'>Kod producenta: {manufacturer_id}</span>
                                )}
                            </div>
                            <div className="prose mt-4">
                                <ReactMarkdown children={description || ''} />
                            </div>
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
