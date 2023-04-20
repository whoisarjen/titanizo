import { Hero } from '@/components/Hero'
import { BestsellerSection } from '@/components/BestsellerSection'
import { GridFeatures } from '@/components/GridFeatures'

export default function Home() {

    const features = [
        {
            name: 'Deante Silia',
            description:
                'Kolekcja Silia to bogaty wachlarz produktów: od baterii, poprzez prysznice, ceramikę a na akcesoriach i konsoli kończąc. Cała kolekcja Deante Silia jest perfekcyjnie dopracowana i daje maksymalne możliwości aranżacyjne.',
            image: 'https://media.deante.pl/decor/ARANZE/RGB_BQS_N20M%2C%20CQR_SU4S%2C%20ADI_N111%2C%20NHC_N10U%2C%20ADM_N801.jpg',
            cta: {
                title: "Zobacz kolekcję",
                href: "#"
            }
        }
    ]

    return (
        <>
            <Hero />
            <GridFeatures features={features}/>
        </>
    )
}
