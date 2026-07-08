import type { ReactNode } from 'react'
import { BlogScrollActions } from './blog-scroll-actions'
import { BlogExitIntentPopup } from './exit-intent-popup'

export default function BlogLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <BlogScrollActions />
      <BlogExitIntentPopup />
    </>
  )
}
