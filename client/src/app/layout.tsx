import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import BagContextWrapper from '@/containers/BagContextWrapper/BagContextWrapper'
import SessionProviderWrapper from '@/containers/SessionProviderWrapper/SessionProviderWrapper'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const GOOGLE_ANALYTICS_ID = 'G-EGW3MQH0HP'

export const revalidate = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME)

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl" className={inter.className}>
            <body>
                {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script
                            id="google-analytics"
                            strategy="afterInteractive"
                        >
                            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', ${GOOGLE_ANALYTICS_ID});
                        `}
                        </Script>
                    </>
                )}
                <BagContextWrapper>
                    <SessionProviderWrapper>
                        {/* @ts-expect-error Async Server Component */}
                        <Navbar />
                        <div className="container mx-auto flex min-h-screen flex-col pt-[100px]">
                            <div className="flex flex-1 flex-col">
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </SessionProviderWrapper>
                </BagContextWrapper>
            </body>
        </html>
    )
}
