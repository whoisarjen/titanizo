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
            <body>
                {/* @ts-expect-error Async Server Component */}
                <Navbar />
                <div className="container mx-auto">{children}</div>
            </body>
        </html>
    )
}
