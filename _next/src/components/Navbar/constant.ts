import {
    IconDefinition,
    faMagnifyingGlass,
    faUser,
} from '@fortawesome/free-solid-svg-icons'

type MenuIcon = {
    name: string
    href: string
    icon: IconDefinition
}

export const MENU_ICONS = [
    { name: 'Wyszukiwarka', href: '/search', icon: faMagnifyingGlass },
    // { name: 'Moje konto', href: '/account', icon: faUser },
] as const satisfies Readonly<MenuIcon[]>
