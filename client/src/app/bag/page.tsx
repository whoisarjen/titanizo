import BagList from './BagList'
import BagSidebar from './BagSidebar'

const Bag = () => {
    return (
        <div className="mx-auto flex w-full max-w-7xl gap-6 p-6">
            <div className="flex-1">
                <BagList />
            </div>
            <BagSidebar />
        </div>
    )
}

export default Bag
