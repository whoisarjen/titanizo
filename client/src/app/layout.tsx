import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import BagContextWrapper from '@/containers/BagContextWrapper/BagContextWrapper'
import SessionProviderWrapper from '@/containers/SessionProviderWrapper/SessionProviderWrapper'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl">
            <body>
                <BagContextWrapper>
                    <SessionProviderWrapper>
                        {/* @ts-expect-error Async Server Component */}
                        <Navbar />
                        <div className="container mx-auto flex min-h-screen flex-col pt-[100px]">
                            <div className="flex flex-col flex-1">{children}</div>
                            <Footer />
                        </div>
                    </SessionProviderWrapper>
                </BagContextWrapper>
            </body>
        </html>
    )
}
