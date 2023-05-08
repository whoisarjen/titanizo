import Image, { ImageProps } from 'next/image'

export const WrappedImage = (props: ImageProps) => {
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
            {...props}
            src={`${props.src?.toString().includes('http') ? '' : process.env.NEXT_PUBLIC_SERVER_CDN_URL}${props.src}`}
        />
    )
}