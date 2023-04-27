import Link from 'next/link'
import { range } from 'lodash'

interface PaginationProps {
    meta: Meta
    defaultHref: string
}

export const Pagination = ({
    meta: {
        pagination: { page, pageCount },
    },
    defaultHref,
}: PaginationProps) => {
    const options = range(page - 2 > 1 ? page - 2 : 1, pageCount)

    return (
        <div className="flex flex-1 items-center justify-center gap-3 p-3">
            {page !== 1 && (
                <Link href={`${defaultHref}?page=${page - 1}`}>Poprzednia</Link>
            )}
            {options.slice(0, 5).map((number) => (
                <Link
                    id={number.toString()}
                    href={`${defaultHref}?page=${number}`}
                    className={`${number === page && 'bg-black text-white'} p-3`}
                >
                    {number}
                </Link>
            ))}
            {page !== pageCount && (
                <Link href={`${defaultHref}?page=${page + 1}`}>Następna</Link>
            )}
        </div>
    )
}
