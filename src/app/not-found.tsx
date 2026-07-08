import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MarketingNav />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="text-8xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Page not found
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Try one of the links below.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button size="lg" className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md">
                Go to homepage <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="font-semibold">
                Browse blog
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}
