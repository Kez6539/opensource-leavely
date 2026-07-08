import Image from 'next/image'

export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <Image
      src="/logo.webp"
      alt="Leavely - Leave Management Software for UK Businesses"
      width={200}
      height={64}
      className={`${className} w-auto`}
    />
  )
}
