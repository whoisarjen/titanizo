export const Subcategories = ({
    subcategories,
}: {
    subcategories: Subcategory[]
}) => {
    return (
        <div className="absolute left-0 top-[60px] z-10 min-h-[40vh] w-full bg-black/40 text-white">
            {subcategories.map(({ id, attributes: { name } }) => (
                <div key={id}>{name}</div>
            ))}
        </div>
    )
}
