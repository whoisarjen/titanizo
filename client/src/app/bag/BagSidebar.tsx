'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { formatPrice } from '@/utils/product.utils'

const BagSidebar = () => {
    const { bag } = useContext(BagContext)

    const grossPrice = bag.reduce(
        (prev, product) => prev + product.attributes.gross_price,
        0
    )
    const delieverPrice = 10.49

    return (
        <div className="w-full max-w-sm">
            <div className="sticky top-[124px] flex flex-1 flex-col divide-y">
                <div className="flex flex-1 flex-col gap-4 pb-4">
                    <div className="text-xl font-bold">Do zapłaty</div>
                    <div className="flex flex-1 items-center justify-between">
                        <div>Wartość produktów</div>
                        <div>{formatPrice(grossPrice)}</div>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div>Dostawa</div>
                        <div>{formatPrice(delieverPrice)}</div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 pt-4">
                    <div className="flex flex-1 items-center justify-between">
                        <div>Do zapłaty (w tym VAT)</div>
                        <div>{formatPrice(grossPrice + delieverPrice)}</div>
                    </div>
                    <Link href="/checkout" className="button w-full">
                        Przejdź do kasy
                    </Link>
                    <div className="flex flex-row items-center gap-4 text-xs">
                        <input type="checkbox" id="rule" name="rule" />
                        <label htmlFor="rule">
                            Wyrażam zgodę na przetwarzanie moich danych
                            osobowych w celu korzystania z Serwisu Deante.pl (w
                            tym zakupu towarów lub usług) przez okres
                            korzystania z serwisu. Oświadczam, że zapoznałem/am
                            się z informacjami dotyczącymi korzystania z moich
                            danych osobowych wyjaśnionymi w Polityce
                            Prywatności.
                        </label>
                    </div>
                    <div className="flex flex-row items-center gap-4 text-xs">
                        <input type="checkbox" id="rule2" name="rule2" />
                        <label htmlFor="rule2">
                            Zgadzam się z Warunkami Świadczenia Usługi i
                            podporządkuję się im bezwarunkowo. (Przeczytaj
                            Warunki Świadczenia Usługi) i przeczytałem politykę
                            prywatności
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BagSidebar
