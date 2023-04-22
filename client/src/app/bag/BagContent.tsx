'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import { useContext, useMemo, useEffect } from 'react'
import { uniqBy, capitalize } from 'lodash'
import Image from 'next/image'
import { formatPrice, getProductHref } from '@/utils/product.utils'
import Link from 'next/link'
import { useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Zod from 'zod'

const orderSchema = Zod.object({
    email: Zod.string().email({ message: 'Niepoprawny adres email!' }),
    name: Zod.string().min(3, {
        message: 'Imię musi mieć conajmniej 3 litery',
    }),
    surname: Zod.string().min(3, {
        message: 'Nazwisko musi mieć conajmniej 3 litery',
    }),
    country: Zod.string().min(3).default('Polska'),
    postcode: Zod.string()
        .min(1, { message: 'Kod musi mieć conajmniej 1 literę' })
        .max(32, { message: 'Kod musi mieć maksymalnie 32 litery' }),
    town: Zod.string().min(3, {
        message: 'Miasto musi mieć conajmniej 3 litery',
    }),
    address: Zod.string().min(3, {
        message: 'Adres musi mieć conajmniej 3 litery',
    }),
    house: Zod.string().min(1, {
        message: 'Budynek musi mieć conajmniej 1 literę',
    }),
    phone: Zod.string()
        .refine((val) => val.length === 9 && /^\d+$/.test(val), {
            message: 'Podaj poprawny numer telefonu!',
        })
        .transform((val) => Number(val)),
    rule: Zod.boolean().refine((val) => !!val, {
        message: 'Musisz zaakceptować!',
    }),
    rule2: Zod.boolean().refine((val) => !!val, {
        message: 'Musisz zaakceptować!',
    }),
})

type OrderSchema = Zod.infer<typeof orderSchema>

type FieldTranslate = {
    [key in keyof OrderSchema]: string
}

const uniqueBagMapping = (bag: Product[]) => (product: Product) => ({
    ...product,
    quantity: bag.filter(({ id }) => id === product.id).length,
})

const FIELD_TRANSLATE = {
    email: 'Email',
    name: 'Imię',
    surname: 'Nazwisko',
    country: 'Kraj',
    postcode: 'Kod pocztowy',
    town: 'Miasto',
    address: 'Ulica',
    house: 'Numer domu / lokalu',
    phone: 'Telefon',
    rule: '',
    rule2: '',
} as const satisfies FieldTranslate

const getInput =
    (register: any, errors: FieldErrors<OrderSchema>) =>
    (field: keyof OrderSchema, options: object = {}) =>
        (
            <>
                <label htmlFor={field}>
                    {capitalize(FIELD_TRANSLATE[field])}
                </label>
                <input
                    id={field}
                    className="input"
                    required
                    {...options}
                    {...register(field)}
                />
                {errors[field]?.message && (
                    <div className="text-red-500">{errors[field]?.message}</div>
                )}
            </>
        )

const BagContent = () => {
    const { bag, removeProductFromBag } = useContext(BagContext)

    const grossPrice = bag.reduce(
        (prev, product) => prev + product.attributes.gross_price,
        0
    )
    const delieverPrice = 10.49

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm<OrderSchema>({ resolver: zodResolver(orderSchema) })

    const onSubmit = (data: OrderSchema) => console.log({ data })

    const preparedBag = useMemo(() => {
        const uniqueBag = uniqBy(bag, 'id')
        const uniqueBagWithQuanitity = uniqueBag.map(uniqueBagMapping(bag))

        return uniqueBagWithQuanitity
    }, [bag.length])

    useEffect(() => {
        reset({ country: 'Polska' })
    }, [])

    const getInputWrapper = getInput(register, errors)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-full max-w-7xl gap-6 p-6"
        >
            <div className="flex flex-1 flex-col gap-6 divide-y">
                <div className="flex flex-1 flex-col gap-6">
                    <h1 className="text-xl font-bold">
                        Koszyk ({bag.length}.art)
                    </h1>
                    <div className="flex flex-1 flex-col divide-y">
                        {preparedBag.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-1 justify-center gap-3 p-3"
                            >
                                <Image
                                    src="https://media.deante.pl/org/ARANZE/RGB_SOMNIA_BOX_hiacynt_abelia_temisto_mokko.jpg"
                                    alt="Hero placeholder"
                                    className="object-cover"
                                    width={96}
                                    height={51}
                                />
                                <div className="flex flex-1 flex-row">
                                    <div className="flex flex-1 flex-col items-start justify-between">
                                        <Link
                                            className="font-bold"
                                            href={getProductHref(product)}
                                        >
                                            {product.attributes.name}
                                        </Link>
                                        <div>DARTED - Chinosy - beige</div>
                                        <div>Kolor: beige</div>
                                        <div>Rozmiar: 40</div>
                                        <button
                                            onClick={() =>
                                                removeProductFromBag(product)
                                            }
                                            className="text-gray-500"
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <div>x{product.quantity}</div>
                                        <div className="font-bold">
                                            {formatPrice(
                                                product.quantity *
                                                    product.attributes
                                                        .gross_price
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-1 flex-col gap-6 pt-6"
                >
                    <h1 className="text-xl font-bold">1. Adres dostawy</h1>
                    {getInputWrapper('email')}
                    {getInputWrapper('name')}
                    {getInputWrapper('surname')}
                    {getInputWrapper('country', { disabled: true })}
                    {getInputWrapper('postcode')}
                    {getInputWrapper('town')}
                    {getInputWrapper('address')}
                    {getInputWrapper('house')}
                    {getInputWrapper('phone', {
                        placeholder: '123-456-789',
                    })}
                </div>
                <div className="flex flex-1 flex-col gap-6 pt-6">
                    <h1 className="text-xl font-bold">2. Dostawa</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="flex flex-1 flex-col gap-6 pt-6">
                    <h1 className="text-xl font-bold">3. Płatność</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

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
                        <button className="button w-full">
                            Przejdź do kasy
                        </button>
                        <div className="flex flex-col gap-4 text-xs">
                            <div className="flex flex-row items-center gap-4 ">
                                <input
                                    type="checkbox"
                                    id="rule"
                                    {...register('rule')}
                                />
                                <label htmlFor="rule">
                                    Wyrażam zgodę na przetwarzanie moich danych
                                    osobowych w celu korzystania z Serwisu
                                    Deante.pl (w tym zakupu towarów lub usług)
                                    przez okres korzystania z serwisu.
                                    Oświadczam, że zapoznałem/am się z
                                    informacjami dotyczącymi korzystania z moich
                                    danych osobowych wyjaśnionymi w Polityce
                                    Prywatności.
                                </label>
                            </div>
                            {errors.rule?.message && (
                                <div className="text-red-500">
                                    {errors.rule?.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 text-xs">
                            <div className="flex flex-row items-center gap-4 ">
                                <input
                                    type="checkbox"
                                    id="rule2"
                                    {...register('rule2')}
                                />
                                <label htmlFor="rule2">
                                    Zgadzam się z Warunkami Świadczenia Usługi i
                                    podporządkuję się im bezwarunkowo.
                                    (Przeczytaj Warunki Świadczenia Usługi) i
                                    przeczytałem politykę prywatności
                                </label>
                            </div>
                            {errors.rule2?.message && (
                                <div className="text-red-500">
                                    {errors.rule2?.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BagContent
