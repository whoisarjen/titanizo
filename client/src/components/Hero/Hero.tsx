import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export const Hero = () => {
    return (
        <section className="relative h-[75vh] mt-[-60px]">
            <Image
                src="https://media.deante.pl/org/ARANZE/RGB_SOMNIA_BOX_hiacynt_abelia_temisto_mokko.jpg"
                alt="Hero placeholder"
                fill
                className="object-cover"
            />
            <div className="z-1 relative inset-0 flex h-full items-end bg-gradient-to-tr from-black/90 from-20% via-black/10 p-10 text-white">
                <div>
                    <h1 className="text-8xl font-semibold leading-tight tracking-tight">
                        Hiacynt
                    </h1>
                    <h2 className="mt-2 text-2xl font-thin">
                        Biżuteria marki Deante do Twojej Łazienki
                    </h2>
                    <button className="mt-5 border-4 border-white px-5 py-3 font-medium transition-colors hover:bg-white hover:text-black">
                        Zobacz kolekcję Hiacynt{' '}
                        <FontAwesomeIcon
                            className="ml-2"
                            icon={faChevronRight}
                        />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero
