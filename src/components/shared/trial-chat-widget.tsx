'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Bot, Clock3, MessageCircle, Send, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ChatRole = 'assistant' | 'user'

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

const SUPPORT_EMAIL = 'hello@leavely.co.uk'
const CRISP_SCRIPT_ID = 'leavely-crisp-chat'
const initialMessages: ChatMessage[] = [
  {
    id: 'assistant-welcome',
    role: 'assistant',
    text:
      'Hi, I can help with your Leavely trial. Ask about setup, importing employees, leave policies, billing, or switching from spreadsheets.',
  },
]

const fallbackReplies = [
  {
    keywords: ['setup', 'onboard', 'onboarding', 'import', 'employees', 'team'],
    reply:
      'For setup, start with Settings, then add employees and leave policies. If you are migrating from a spreadsheet, send us your columns and we will help map them.',
  },
  {
    keywords: ['price', 'pricing', 'billing', 'subscribe', 'subscription', 'paid', 'card'],
    reply:
      'You can review plans and add billing from Settings > Billing. Trials keep full access until the trial date shown there.',
  },
  {
    keywords: ['leave', 'holiday', 'absence', 'request', 'approve', 'approval'],
    reply:
      'Use Leave to request or approve time off. Owners and managers can also review clashes, balances, and team calendars from the same area.',
  },
  {
    keywords: ['sick', 'sickness', 'absence', 'bradford', 'fit note'],
    reply:
      'Sickness can be recorded from the sickness flow, with history and Bradford Factor visible for managers. Use notes for fit-note or return-to-work context.',
  },
  {
    keywords: ['rota', 'shift', 'clock', 'time', 'timesheet'],
    reply:
      'Rotas and clock-in can be enabled from settings when your workspace needs shift planning or time capture alongside leave.',
  },
]

function getFallbackReply(message: string): string {
  const normalizedMessage = message.toLowerCase()
  const match = fallbackReplies.find((item) =>
    item.keywords.some((keyword) => normalizedMessage.includes(keyword))
  )

  if (match) {
    return match.reply
  }

  return `I can help with setup, billing, leave, sickness, rotas, and switching from spreadsheets. For anything account-specific, email ${SUPPORT_EMAIL} and include your workspace name.`
}

function createMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    text,
  }
}

export function TrialChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID?.trim() ?? ''
  const hasLiveChat = crispWebsiteId.length > 0

  useEffect(() => {
    if (!hasLiveChat) return

    window.$crisp = window.$crisp ?? []
    window.CRISP_WEBSITE_ID = crispWebsiteId
    window.$crisp.push(['do', 'chat:hide'])

    if (!document.getElementById(CRISP_SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = CRISP_SCRIPT_ID
      script.src = 'https://client.crisp.chat/l.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [crispWebsiteId, hasLiveChat])

  useEffect(() => {
    if (!hasLiveChat || !window.$crisp) return

    window.$crisp.push(['do', open ? 'chat:show' : 'chat:hide'])
    if (open) {
      window.$crisp.push(['do', 'chat:open'])
    }
  }, [hasLiveChat, open])

  const visibleMessages = useMemo(() => messages.slice(-6), [messages])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) return

    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage('user', trimmedInput),
      createMessage('assistant', getFallbackReply(trimmedInput)),
    ])
    setInput('')
  }

  if (hasLiveChat) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          type="button"
          className="h-12 rounded-full px-4 shadow-lg shadow-emerald-950/20"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
        >
          <MessageCircle className="h-4 w-4" />
          Trial support
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3">
      {open && (
        <section className="w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-lg border bg-background shadow-xl shadow-emerald-950/15">
          <header className="flex items-start justify-between gap-3 border-b bg-emerald-950 px-4 py-3 text-white">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 shrink-0" />
                <h2 className="truncate text-sm font-semibold">Trial Support</h2>
              </div>
              <p className="mt-1 text-xs text-emerald-50/80">
                24/7 answers, with account help by email.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close trial support</span>
            </Button>
          </header>

          <div className="space-y-3 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary" className="gap-1">
                <Clock3 className="h-3 w-3" />
                24/7 chatbot
              </Badge>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Email support
              </a>
            </div>

            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {visibleMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm leading-5',
                    message.role === 'assistant'
                      ? 'mr-8 bg-muted text-foreground'
                      : 'ml-8 bg-emerald-600 text-white'
                  )}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <form className="flex gap-2" onSubmit={handleSubmit}>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about your trial..."
                aria-label="Ask trial support"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </section>
      )}

      <Button
        type="button"
        className="h-12 rounded-full px-4 shadow-lg shadow-emerald-950/20"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <MessageCircle className="h-4 w-4" />
        Trial support
      </Button>
    </div>
  )
}
