import { Navbar } from '@/components/Navbar'
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl">
            <body className="container mx-auto">
                {/* @ts-expect-error Async Server Component */}
                <Navbar />
                {children}
            </body>
        </html>
    )
}
