const trustedLogos = [
  {
    name: 'UK SME operators',
    initials: 'UK',
    detail: 'Owner-led teams',
  },
  {
    name: 'Care providers',
    initials: 'CP',
    detail: 'Rota and absence cover',
  },
  {
    name: 'Professional services',
    initials: 'PS',
    detail: 'Office and client teams',
  },
  {
    name: 'Startups and scaleups',
    initials: 'SS',
    detail: 'Growing teams',
  },
]

export function TrustedLogoStrip({ className = '' }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="trusted-logo-strip-heading">
      <div className="mx-auto max-w-6xl">
        <p
          id="trusted-logo-strip-heading"
          className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500"
        >
          Trusted by UK teams
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {trustedLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex min-h-20 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-xs font-black tracking-wide text-white">
                {logo.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-gray-950">{logo.name}</p>
                <p className="mt-0.5 truncate text-xs text-gray-500">{logo.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
