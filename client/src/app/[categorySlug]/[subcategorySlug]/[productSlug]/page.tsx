import { getData } from '@/utils/api.utils'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ProductBoxSmall } from '@/components/ProductBoxSmall'
import { transformObjectToPathname } from '@/utils/product.utils'
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
        )}?populate[0]=currency&populate[1]=subcategory.category&populate[2]=recommended_products.subcategory.category`
    )

    const {
        name,
        description,
        currency,
        gross_price,
        manufacturer_id,
        recommended_products,
    } = product.data.attributes



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
    return (
        <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full max-w-7xl flex-col place-content-evenly gap-3 md:flex-row">
                <Image
                    src="/lazienkaPlaceholder.jpg"
                    alt={name}
                    width={640}
                    height={360}
                />
                <div className="flex flex-1 flex-col justify-evenly gap-3">
                    <h1 className="flex text-4xl font-bold">{name}</h1>
                    {manufacturer_id && (
                        <div>Kod produktu: {manufacturer_id}</div>
                    )}
                    <div>
                        {gross_price}
                        {currency.data.attributes.code_iso_4217}
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
                    <div>
                        <ButtonAddToBag product={product.data} />
                    </div>
                </div>
            </div>
            <div className="prose">
                <ReactMarkdown children={description || ''} />
            </div>
            <div className="flex w-full items-start justify-evenly">
                {recommended_products.data.map((product) => (
                    <ProductBoxSmall
                        key={product.id}
                        href={`${transformObjectToPathname(
                            product.attributes.subcategory.data.attributes
                                .category.data
                        )}${transformObjectToPathname(
                            product.attributes.subcategory.data
                        )}${transformObjectToPathname(product)}`}
                        product={product}
                    />
                ))}
            </div>
            <GridFeatures features={features} />
        </div>
    )
}
