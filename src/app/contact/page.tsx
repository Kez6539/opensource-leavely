import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Leavely — Get in Touch With Our Team',
  description:
    'Have a question about Leavely? Get in touch. We respond within 24 hours. Email us at hello@leavely.online or use our contact form.',
  alternates: { canonical: `${SITE_URL}/contact` },
  keywords: [
    'contact Leavely',
    'Leavely support',
    'leave management software support',
    'Leavely help',
    'Leavely email',
  ],
  openGraph: {
    title: 'Contact Leavely — We Respond Within 24 Hours',
    description:
      'Questions about leave management software? Reach out to the Leavely team. We respond within 24 hours.',
    url: `${SITE_URL}/contact`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Leavely',
  description: 'Get in touch with the Leavely team.',
  url: `${SITE_URL}/contact`,
  isPartOf: { '@type': 'WebSite', name: 'Leavely', url: SITE_URL },
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@leavely.online',
    href: 'mailto:hello@leavely.online',
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'United Kingdom',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
          <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Get in
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                touch
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
              Have a question about Leavely? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border bg-white p-7 md:p-9 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Right: Info Card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border bg-gradient-to-br from-emerald-50/60 to-teal-50/60 p-7 md:p-9 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact details</h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-base font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-base font-semibold text-gray-900">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-200/50">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Looking for a quick demo instead? Try Leavely free for 14 days — no credit
                    card required.
                  </p>
                  <Link href="/register" className="inline-block mt-4">
                    <Button
                      size="sm"
                      className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20"
                    >
                      Start free trial <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to simplify leave management?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Free for 14 days. No credit card. Set up in 2 minutes.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg"
                >
                  Get started free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
