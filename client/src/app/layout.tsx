import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import BagContextWrapper from '@/containers/BagContextWrapper/BagContextWrapper'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl">
            <body>
                {/* @ts-expect-error Async Server Component */}
                <Navbar />
                <div className="container mx-auto pt-[100px]">

                    <BagContextWrapper>{children}</BagContextWrapper>
                </div>
                {/* <Footer /> */}
            </body>
        </html>
    )
}
