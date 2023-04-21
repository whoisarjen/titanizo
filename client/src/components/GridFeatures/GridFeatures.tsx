import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


interface GridFeaturesProps {
    features: {
        name: string,
        description: string,
        image: string,
        cta?: {
            title: string,
            href: string
        }
    }[]
}

export const GridFeatures = ({
    features
}: GridFeaturesProps) => {
    return (
        <section className="w-full">
            {features
                .filter((feature) => feature.description && feature.image)
                .map((feature, id) => {
                    const odd = id % 2

                    return (
                        <div
                            key={id}
                            className="flex w-full flex-col md:flex-row"
                        >
                            <div
                                className={`flex aspect-square flex-1 flex-col items-center justify-center bg-slate-50 text-center md:aspect-auto ${
                                    odd ? 'md:order-2' : 'md:order-1'
                                }`}
                            >
                                <div className="max-w-[90%] tracking-tight md:max-w-[70%] lg:max-w-[50%]">
                                    <h4 className="text-2xl font-bold lg:text-3xl">
                                        {feature.name}
                                    </h4>
                                    <p className="mt-3 text-sm lg:text-base">
                                        {feature.description}
                                    </p>
                                    {
                                        feature.cta &&
                                        <button className="button">
                                            {feature.cta.title}
                                            <FontAwesomeIcon
                                                className="ml-2"
                                                icon={faChevronRight}
                                            />
                                        </button>
                                    }

                                </div>
                            </div>
                            <div
                                className={`relative aspect-square flex-1 ${
                                    odd ? 'md:order-1' : 'md:order-2'
                                }`}
                            >
                                <Image
                                    src={feature.image}
                                    alt={feature.name}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>
                    )
                })}
        </section>
    )
}