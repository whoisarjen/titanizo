import BagContent from './BagContent'
import BagSidebar from './BagSidebar'

const Bag = () => {
    return (
        <div className="mx-auto flex w-full max-w-7xl gap-6 p-6">
            <BagContent />
            <BagSidebar />
        </div>
    )
}

export default Bag
