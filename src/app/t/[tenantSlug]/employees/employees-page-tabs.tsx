'use client'

import { useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Users, UsersRound, Crown } from 'lucide-react'

interface TeamSummary {
  id: string
  name: string
  managerName: string | null
  memberCount: number
}

interface Props {
  tenantSlug: string
  currentTab: string
  teams: TeamSummary[]
  directoryContent: ReactNode
}

const tabs = [
  { key: 'directory', label: 'Directory', icon: Users },
  { key: 'teams', label: 'Teams', icon: UsersRound },
]

export function EmployeesPageTabs({ tenantSlug, currentTab, teams, directoryContent }: Props) {
  const [tab, setTab] = useState(currentTab)
  const router = useRouter()

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key)
              router.replace(`/t/${tenantSlug}/employees?tab=${t.key}`, { scroll: false })
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-[1px]',
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'directory' && directoryContent}
      {tab === 'teams' && (
        <TeamsTab tenantSlug={tenantSlug} teams={teams} />
      )}
    </div>
  )
}

function TeamsTab({ tenantSlug, teams }: { tenantSlug: string; teams: TeamSummary[] }) {
  if (teams.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 shadow-sm text-center">
        <UsersRound className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
        <h3 className="text-sm font-semibold text-foreground mb-1">No teams yet</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
          Create teams to organise employees into groups with managers.
        </p>
        <Link href={`/t/${tenantSlug}/employees/teams`}>
          <button className="text-xs font-medium text-primary hover:underline">
            Manage teams
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">
          {teams.length} team{teams.length !== 1 ? 's' : ''}
        </p>
        <Link
          href={`/t/${tenantSlug}/employees/teams`}
          className="text-xs font-medium text-primary hover:underline"
        >
          Manage all teams
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/t/${tenantSlug}/employees/teams/${team.id}`}
            className="group block"
          >
            <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UsersRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {team.memberCount} member{team.memberCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {team.managerName && (
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Crown className="h-3.5 w-3.5 text-amber-500" />
                  <span>{team.managerName}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
