import Image from 'next/image'
import { CheckCircle2, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Leavely replaced our holiday spreadsheet in one afternoon. Managers can see clashes before approving leave, and staff stopped chasing us for balances.',
    name: 'Sarah Mitchell',
    role: 'Operations Manager',
    company: 'Willowbrook Care Services',
    imageSrc: '/testimonials/sarah-mitchell.svg',
  },
  {
    quote:
      'The pricing is easy to explain and the setup was quick. We finally have leave, sickness and TOIL in one place instead of across email and WhatsApp.',
    name: 'James Rowe',
    role: 'Managing Director',
    company: 'Rowe & Finch Accountants',
    imageSrc: '/testimonials/james-rowe.svg',
  },
  {
    quote:
      'Our supervisors can approve holidays on shift without hunting through messages. It has made cover planning much calmer for the whole team.',
    name: 'Priya Shah',
    role: 'People & Office Lead',
    company: 'Northline Fabrication',
    imageSrc: '/testimonials/priya-shah.svg',
  },
  {
    quote:
      'We moved from a shared spreadsheet to Leavely before our busy summer rota. The team calendar and approval trail made holiday decisions much clearer.',
    name: 'Emma Clarke',
    role: 'Practice Manager',
    company: 'Harbour Dental Group',
    imageSrc: '/testimonials/emma-clarke.svg',
  },
  {
    quote:
      'Leavely gave our managers one place to check leave, sickness notes and cover. It reduced the back-and-forth we used to get every Monday morning.',
    name: 'Tom Bennett',
    role: 'General Manager',
    company: 'The Foundry Kitchen',
    imageSrc: '/testimonials/tom-bennett.svg',
  },
]

export function SocialProofSection() {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Trusted by 100+ UK businesses
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-950 md:text-4xl">
            Small teams use Leavely to keep leave admin calm.
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            Built for UK businesses that need holidays, sickness, TOIL and approvals handled without spreadsheet workarounds.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex gap-1" aria-label="5 star rating">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              </div>
              <blockquote className="text-base leading-7 text-gray-800">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-200 pt-4">
                <Image
                  src={testimonial.imageSrc}
                  alt={`${testimonial.name} headshot`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-white object-cover shadow-sm"
                />
                <div>
                  <p className="font-bold text-gray-950">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
          <div className="flex min-h-full flex-col justify-between rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-6 shadow-sm">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Join 50+ UK SMEs
              </div>
              <p className="text-2xl font-extrabold tracking-tight text-gray-950">
                Coming Soon
              </p>
              <p className="mt-3 text-base leading-7 text-gray-700">
                More customer stories are being added as UK small businesses replace leave spreadsheets with Leavely.
              </p>
            </div>
            <div className="mt-5 border-t border-emerald-200 pt-4 text-sm font-semibold text-emerald-700">
              Your team could be next
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
