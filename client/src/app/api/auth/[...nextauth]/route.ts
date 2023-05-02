import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,
    callbacks: {
        // @ts-ignore
        session: async (session: any, user: any) => {
            return {
                ...session,
                ...user,
            }
        },
        jwt: async ({ token, account }) => {
            if (account) {
                const response = await fetch(
                    `http://strapi:1337/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                const data = await response.json()

                token.jwt = data.jwt
                token.id = data.user.id
                token.user = data.user
            }
            return token
        },
    },
}

    
const handler = (req: any, res: any) =>
    NextAuth(req, res, authOptions);
export { handler as GET, handler as POST }
