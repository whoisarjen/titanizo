import Link from "next/link";
import BagList from "./BagList";

export default function Bag() {
    return <div>
        <BagList />
        <Link href="/checkout" className="bg-red-500">Przejdź do kasy</Link>
    </div>
}
