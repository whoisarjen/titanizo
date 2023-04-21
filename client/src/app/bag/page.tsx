import BagList from './BagList'
import BagSidebar from './BagSidebar'

const Bag = () => {
    return (
        <div className="mx-auto flex w-full max-w-7xl gap-6 p-6">
            <BagList />
            <BagSidebar />
        </div>
    )
}

export default Bag
