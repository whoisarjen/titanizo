// @ts-check
import { z } from "zod";
import { env } from "process"

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
    NEXT_PUBLIC_API_TOKEN: z.string(),
    NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE: z.string(),
    NEXT_PUBLIC_BRAND: z.string(),
    NEXT_PUBLIC_SERVER_ADDRESS: z.string(),
    NEXT_PUBLIC_BRAND_LOGO_URL: z.string(),
    NEXT_PUBLIC_API_REVALIDATE: z.number(),
    NEXT_PUBLIC_GOOGLE_CLIENT: z.string(),
    NEXT_PUBLIC_GOOGLE_SECRET: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
    NEXT_PUBLIC_API_TOKEN: env.NEXT_PUBLIC_API_TOKEN,
    NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE: env.NEXT_PUBLIC_DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE,
    NEXT_PUBLIC_BRAND: env.NEXT_PUBLIC_BRAND,
    NEXT_PUBLIC_SERVER_ADDRESS: env.NEXT_PUBLIC_SERVER_ADDRESS,
    NEXT_PUBLIC_BRAND_LOGO_URL: env.NEXT_PUBLIC_BRAND_LOGO_URL,
    NEXT_PUBLIC_API_REVALIDATE: Number(env.NEXT_PUBLIC_API_REVALIDATE),
    NEXT_PUBLIC_GOOGLE_CLIENT: env.NEXT_PUBLIC_GOOGLE_CLIENT,
    NEXT_PUBLIC_GOOGLE_SECRET: env.NEXT_PUBLIC_GOOGLE_SECRET,
};