import { IconDefinition, faMagnifyingGlass, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"

type MenuLink = {
    name: string
}

export const MENU_LINKS = [
    { name: 'Produkty' },
    { name: 'Kolekcje' },
    { name: 'Inspiracje' },
    { name: 'Kontakt' },
] as const satisfies Readonly<MenuLink[]>

type MenuIcon = {
    name: string
    icon: IconDefinition
}

export const MENU_ICONS = [
    { name: 'Wyszukiwarka', icon: faMagnifyingGlass},
    { name: 'Koszyk', icon: faCartShopping},
    { name: 'Moje konto', icon: faUser},
] as const satisfies Readonly<MenuIcon[]>