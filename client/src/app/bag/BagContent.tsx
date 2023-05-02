'use client'

import { BagContext } from '@/containers/BagContextWrapper/BagContext'
import {
    useContext,
    useMemo,
    useEffect,
    useReducer,
} from 'react'
import { uniqBy, capitalize } from 'lodash'
import Image from 'next/image'
import { formatPrice, getProductHref } from '@/utils/product.utils'
import Link from 'next/link'
import { useForm, type FieldErrors, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema, type OrderSchema } from '@/schemas/order.schema'
import { postAPI } from '@/utils/api.utils'

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
    products: '',
    providerOptionId: '',
    paymentId: '',
} as const satisfies FieldTranslate

const getInput =
    (register: any, errors: FieldErrors<OrderSchema>) =>
    // eslint-disable-next-line react/display-name
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

interface BagContentProps {
    providers: Provider[]
    payments: Payment[]
}

const DEFAULT_ORDER_STATE = {
    isLoading: false,
    isSuccess: false,
    isError: false,
}

type OrderState = typeof DEFAULT_ORDER_STATE
type orderAction = 'isLoading' | 'isSuccess' | 'isError'

const orderReducer = (_: OrderState, action: orderAction) => {
    switch (action) {
        case 'isLoading':
            return {
                ...DEFAULT_ORDER_STATE,
                isLoading: true,
            }
        case 'isSuccess':
            return {
                ...DEFAULT_ORDER_STATE,
                isSuccess: true,
            }
        case 'isError':
            return {
                ...DEFAULT_ORDER_STATE,
                isError: true,
            }
    }
}

const BagContent = ({ providers, payments }: BagContentProps) => {
    const [orderState, setOrderState] = useReducer(
        orderReducer,
        DEFAULT_ORDER_STATE
    )
    const {
        bag,
        grossPriceOfBag,
        removeProductFromBag,
        removeAllProductsFromBad,
    } = useContext(BagContext)

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        getValues,
        reset,
    } = useForm<OrderSchema>({ resolver: zodResolver(orderSchema) })

    const { replace } = useFieldArray({
        control,
        name: 'products',
        keyName: 'uuid',
    })

    const onSubmit = async (body: OrderSchema) => {
        setOrderState('isLoading')

        await postAPI('/orders', body)
            .then(() => {
                setOrderState('isSuccess')
                removeAllProductsFromBad()
                reset()
            })
            .catch(() => {
                setOrderState('isError')
            })
    }

    const preparedBag = useMemo(() => {
        const uniqueBag = uniqBy(bag, 'id')
        const uniqueBagWithQuanitity = uniqueBag.map(uniqueBagMapping(bag))

        if (!orderState.isSuccess) {
            replace(uniqueBagWithQuanitity)
        }

        return uniqueBagWithQuanitity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bag.length])

    useEffect(() => {
        setValue('country', 'Polska')
    }, [setValue])

    const getInputWrapper = getInput(register, errors)
    const delieverPrice =
        providers
            .flatMap(({ attributes }) => attributes.provider_options.data)
            .find(({ id }) => id === getValues('providerOptionId'))?.attributes
            .gross_price || 0

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
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.attributes.images?.data?.[0]?.attributes.formats.thumbnail.url}`}
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
                        {errors.products?.message && (
                            <div className="text-red-500">
                                {errors.products?.message}
                            </div>
                        )}
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
                    {providers.map((provider) => {
                        return (
                            <div
                                key={provider.id}
                                className="flex flex-1 flex-col gap-6"
                            >
                                <div className="flex-1">
                                    {provider.attributes.name}
                                </div>
                                <div className="flex flex-1 flex-col gap-6">
                                    {provider.attributes.provider_options.data.map(
                                        (providerOption) => (
                                            <div
                                                key={providerOption.id}
                                                className={`button flex justify-between text-start ${
                                                    providerOption.id ===
                                                        getValues(
                                                            'providerOptionId'
                                                        ) &&
                                                    'bg-black text-white'
                                                }`}
                                                onClick={() =>
                                                    setValue(
                                                        'providerOptionId',
                                                        providerOption.id,
                                                        { shouldValidate: true }
                                                    )
                                                }
                                            >
                                                <div>
                                                    {
                                                        providerOption
                                                            .attributes.name
                                                    }
                                                </div>
                                                <div>
                                                    {formatPrice(
                                                        providerOption
                                                            .attributes
                                                            .gross_price
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {errors.providerOptionId?.message && (
                        <div className="text-red-500">
                            {errors.providerOptionId?.message}
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col gap-6 pt-6">
                    <h1 className="text-xl font-bold">3. Płatność</h1>
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className={`button flex justify-between text-start ${
                                payment.id === getValues('paymentId') &&
                                'bg-black text-white'
                            }`}
                            onClick={() =>
                                setValue('paymentId', payment.id, {
                                    shouldValidate: true,
                                })
                            }
                        >
                            {payment.attributes.name}
                        </div>
                    ))}
                    {errors.paymentId?.message && (
                        <div className="text-red-500">
                            {errors.paymentId?.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full max-w-sm">
                <div className="sticky top-[124px] flex flex-1 flex-col divide-y">
                    <div className="flex flex-1 flex-col gap-4 pb-4">
                        <div className="text-xl font-bold">Do zapłaty</div>
                        <div className="flex flex-1 items-center justify-between">
                            <div>Wartość produktów</div>
                            <div>{formatPrice(grossPriceOfBag)}</div>
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                            <div>Dostawa</div>
                            <div>{formatPrice(delieverPrice)}</div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 pt-4">
                        <div className="flex flex-1 items-center justify-between">
                            <div>Do zapłaty (w tym VAT)</div>
                            <div>
                                {formatPrice(grossPriceOfBag + delieverPrice)}
                            </div>
                        </div>
                        <button
                            className="button w-full"
                            disabled={orderState.isLoading}
                        >
                            {orderState.isLoading
                                ? 'Składanie zamówienia...'
                                : 'Złóż zamówienie'}
                        </button>
                        {!!Object.keys(errors).length && (
                            <div className="text-red-500">
                                {
                                    errors[
                                        Object.keys(
                                            errors
                                        )[0] as unknown as keyof typeof errors
                                    ]?.message
                                }
                            </div>
                        )}
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
