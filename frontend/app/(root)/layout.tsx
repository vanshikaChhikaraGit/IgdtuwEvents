import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Analytics } from "@vercel/analytics/react"
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
          <Analytics></Analytics>
        </main>
        <Footer />
      </div>
    )
  }