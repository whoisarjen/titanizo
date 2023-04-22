
import Zod from 'zod'

export const orderSchema = Zod.object({
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
            message: 'Podaj poprawny numer telefonu! (bez numeru kierunkowego)',
        })
        .transform((val) => Number(val)),
    rule: Zod.boolean().refine((val) => !!val, {
        message: 'Musisz zaakceptować!',
    }),
    rule2: Zod.boolean().refine((val) => !!val, {
        message: 'Musisz zaakceptować!',
    }),
    products: Zod.array(Zod.object({
        id: Zod.number().positive(),
        quantity: Zod.number().positive(),
    }), { required_error: "Nie dodałeś żadnych produktów!" }).nonempty({ message: "Nie dodałeś żadnych produktów!" }),
    providerOptionId: Zod.number({ required_error: "Wybierz opcję dostawy!" }).positive(),
})

export type OrderSchema = Zod.infer<typeof orderSchema>
