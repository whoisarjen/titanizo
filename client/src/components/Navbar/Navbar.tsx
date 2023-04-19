import Link from 'next/link'
import { MENU_ICONS, MENU_LINKS } from './constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { useCategories } from '@/hooks/useCategories'
import { Subcategories } from './Subcategories'
import { Fragment } from 'react'

export const Navbar = async () => {
    const { data } = await useCategories()

    return (
        <>
            <nav className="sticky z-50">
                <div className="flex items-center border-b border-white/20 bg-black px-6 py-2 text-white">
                    <span className="text-sm">
                        Darmowa dostawa zamówień od 500 PLN!
                    </span>
                    <div className="flex flex-grow"></div>
                    <a
                        href="tel: +48 883 705 815"
                        className="mr-3 font-medium tracking-tighter"
                    >
                        <FontAwesomeIcon
                            icon={faPhoneVolume}
                            className="mr-2 text-white/50"
                        />
                        883 705 815
                    </a>
                    <small className="text-white/80">9:00 - 19:00</small>
                </div>
                <div>
                    <div className="flex min-h-[60px] w-full items-center bg-black px-6 py-4 ">
                        <img
                            src="https://deante.pl/brand/white.svg"
                            alt="Logo Deante"
                            width="120px"
                            className="mr-10"
                        />
                        {data.map(
                            ({ attributes: { name, subcategories }, id }) => (
                                <Fragment key={id}>
                                    <Link
                                        className="mx-4 uppercase text-white/75 transition-colors hover:text-white"
                                        href="#"
                                    >
                                        {name}
                                    </Link>
                                    {/* <Subcategories
                                        subcategories={subcategories.data}
                                    /> */}
                                </Fragment>
                            )
                        )}
                        <div className="flex flex-grow"></div>

                        {MENU_ICONS.map(({ name, icon }) => (
                            <Link
                                className="mx-2 uppercase text-white/75 transition-colors hover:text-white"
                                href="#"
                                key={name}
                            >
                                <FontAwesomeIcon
                                    icon={icon}
                                    className="text-white"
                                ></FontAwesomeIcon>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="fixed inset-0 z-40 backdrop-blur-xl"></div>
        </>
    )
}
