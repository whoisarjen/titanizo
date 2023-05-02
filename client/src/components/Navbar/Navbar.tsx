import Link from 'next/link'
import { MENU_ICONS } from './constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { getAPI } from '@/utils/api.utils'
import { transformObjectToPathname } from '@/utils/api.utils'
import NavbarIconBag from './NavbarIcons/NavbarIconBag'
import { MENU } from './Navbar.constants'
import { env } from '@/env/client.mjs'
import { NavbarProfileButton } from './NavbarProfileButton/NavbarProfileButton'
import Image from 'next/image'

type GetData = {
    data: Category[]
    meta: Meta
}

export const Navbar = async () => {
    const response = await getAPI<GetData>(
        '/categories?populate[0]=subcategories'
    )

    const data = response.data.map((response) => ({
        ...response,
        attributes: {
            ...response.attributes,
            subcategories: {
                ...response.attributes.subcategories,
                data: response.attributes.subcategories.data.sort((a, b) =>
                    a.attributes.name.localeCompare(b.attributes.name)
                ),
            },
        },
    }))

    return (
        <nav>
            <div className="container fixed left-1/2 top-0 z-10 flex w-full translate-x-[-50%] flex-col text-white">
                <div className="flex items-center border-b border-white/20 bg-black px-6 py-2">
                    <span className="text-sm">
                        Darmowa dostawa zamówień powyżej 500 PLN!
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
                <div className="relative flex min-h-[60px] w-full items-center bg-black/50  px-6 backdrop-blur">
                    <Link href="/">
                        <Image
                            src={env.NEXT_PUBLIC_BRAND_LOGO_URL}
                            alt="Logo Deante"
                            width={120}
                            height={30}
                        />
                    </Link>
                    <div className="z-20 flex h-[60px] flex-row items-center">
                        {data.map((category) => (
                            <div
                                key={category.id}
                                className="group/main flex h-full items-center"
                            >
                                <Link
                                    href={transformObjectToPathname(category)}
                                    className="mx-4 cursor-pointer uppercase transition-colors hover:text-white"
                                >
                                    {category.attributes.name}
                                </Link>
                                <div className="absolute left-0 top-[60px] hidden min-h-[40vh] w-full flex-row bg-black/80 group-hover/main:flex">
                                    <div className="grid flex-1 grid-cols-5 p-6">
                                        {category.attributes.subcategories.data.map(
                                            (subcategory) => (
                                                <div key={subcategory.id}>
                                                    <Link
                                                        key={subcategory.id}
                                                        href={`${transformObjectToPathname(
                                                            category
                                                        )}${transformObjectToPathname(
                                                            subcategory
                                                        )}`}
                                                    >
                                                        {
                                                            subcategory
                                                                .attributes.name
                                                        }
                                                    </Link>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {MENU.map(({ id, name, href }) => (
                            <Link
                                key={id}
                                href={href}
                                className="mx-4 cursor-pointer uppercase transition-colors hover:text-white"
                            >
                                {name}
                            </Link>
                        ))}
                        <NavbarProfileButton />
                    </div>
                    <div className="flex flex-1 flex-row-reverse items-center">
                        <NavbarIconBag />
                        {MENU_ICONS.map(({ name, href, icon }) => (
                            <Link
                                className="p-2 text-white/75 transition-colors hover:text-white"
                                href={href}
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
            </div>
        </nav>
    )
}
