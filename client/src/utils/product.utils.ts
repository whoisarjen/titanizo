import slugify from 'slugify'

export const transformObjectToPathname = ({
    id,
    attributes,
}: DefaultDataWrapper<{ name: string }>): string => {
    return `/${id}--${slugify(attributes.name)}`
}
