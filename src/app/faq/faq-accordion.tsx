'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: React.ReactNode
}

export interface FaqCategory {
  title: string
  items: FaqItem[]
}

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-xl bg-white overflow-hidden transition-shadow hover:shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180 text-emerald-500' : ''
          }`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
        }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-gray-600 leading-relaxed">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.title}>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{category.title}</h2>
          <div className="space-y-3">
            {category.items.map((item) => (
              <AccordionItem key={item.question} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
