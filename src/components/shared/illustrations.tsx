export function TeamIllustration({ className = 'w-48 h-48' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="80" r="60" fill="url(#teamGrad)" opacity="0.1" />
      <circle cx="70" cy="70" r="22" fill="#818cf8" opacity="0.2" />
      <circle cx="70" cy="70" r="15" fill="#6366f1" />
      <circle cx="70" cy="62" r="7" fill="white" />
      <path d="M55 95 C55 85, 85 85, 85 95 L85 105 C85 108, 55 108, 55 105Z" fill="#6366f1" />
      <circle cx="130" cy="70" r="22" fill="#a5b4fc" opacity="0.2" />
      <circle cx="130" cy="70" r="15" fill="#818cf8" />
      <circle cx="130" cy="62" r="7" fill="white" />
      <path d="M115 95 C115 85, 145 85, 145 95 L145 105 C145 108, 115 108, 115 105Z" fill="#818cf8" />
      <circle cx="100" cy="55" r="25" fill="#c7d2fe" opacity="0.2" />
      <circle cx="100" cy="55" r="18" fill="#4f46e5" />
      <circle cx="100" cy="46" r="8" fill="white" />
      <path d="M82 82 C82 70, 118 70, 118 82 L118 95 C118 98, 82 98, 82 95Z" fill="#4f46e5" />
      <circle cx="100" cy="155" r="30" fill="#e0e7ff" opacity="0.3" />
      <defs>
        <radialGradient id="teamGrad"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#e0e7ff" /></radialGradient>
      </defs>
    </svg>
  )
}

export function CalendarIllustration({ className = 'w-40 h-40' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="50" width="140" height="120" rx="16" fill="#e0e7ff" />
      <rect x="30" y="50" width="140" height="35" rx="16" fill="#6366f1" />
      <rect x="30" y="69" width="140" height="16" fill="#6366f1" />
      <circle cx="60" cy="40" r="5" fill="#6366f1" />
      <rect x="57" y="35" width="6" height="25" rx="3" fill="#6366f1" />
      <circle cx="140" cy="40" r="5" fill="#6366f1" />
      <rect x="137" y="35" width="6" height="25" rx="3" fill="#6366f1" />
      <text x="58" y="74" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SUN MON TUE WED</text>
      {[0,1,2,3,4].map(row =>
        [0,1,2,3,4,5,6].map(col => (
          <rect key={`${row}-${col}`} x={42 + col * 18} y={95 + row * 14} width="12" height="9" rx="2" fill={row === 1 && col === 3 ? '#4f46e5' : '#c7d2fe'} opacity={row === 4 && col > 3 ? 0.3 : 0.6} />
        ))
      )}
      <rect x="96" y="109" width="12" height="9" rx="2" fill="#4f46e5" />
    </svg>
  )
}

export function FolderIllustration({ className = 'w-40 h-40' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 70 L30 160 Q30 170 40 170 L160 170 Q170 170 170 160 L170 70 Q170 60 160 60 L110 60 L100 45 Q96 40 90 40 L40 40 Q30 40 30 50Z" fill="#e0e7ff" />
      <path d="M30 80 L30 160 Q30 170 40 170 L160 170 Q170 170 170 160 L170 80 Q170 70 160 70 L40 70 Q30 70 30 80Z" fill="#818cf8" />
      <path d="M30 85 L30 160 Q30 170 40 170 L160 170 Q170 170 170 160 L170 85 Q170 75 160 75 L40 75 Q30 75 30 85Z" fill="#6366f1" />
      <rect x="70" y="100" width="60" height="6" rx="3" fill="white" opacity="0.5" />
      <rect x="80" y="115" width="40" height="6" rx="3" fill="white" opacity="0.3" />
    </svg>
  )
}

export function GlobeIllustration({ className = 'w-40 h-40' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" fill="#e0e7ff" />
      <circle cx="100" cy="100" r="60" fill="#c7d2fe" />
      <ellipse cx="100" cy="100" rx="35" ry="60" stroke="#6366f1" strokeWidth="2.5" fill="none" />
      <ellipse cx="100" cy="100" rx="55" ry="25" stroke="#6366f1" strokeWidth="2" fill="none" />
      <line x1="100" y1="40" x2="100" y2="160" stroke="#6366f1" strokeWidth="2" />
      <line x1="40" y1="100" x2="160" y2="100" stroke="#6366f1" strokeWidth="2" />
      <circle cx="100" cy="100" r="60" stroke="#4f46e5" strokeWidth="3" fill="none" />
      <circle cx="130" cy="70" r="12" fill="#4f46e5" opacity="0.15" />
      <circle cx="75" cy="125" r="10" fill="#4f46e5" opacity="0.15" />
    </svg>
  )
}

export function DashboardHeroIllustration({ className = 'w-64 h-48' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background shapes */}
      <circle cx="250" cy="50" r="80" fill="white" opacity="0.08" />
      <circle cx="50" cy="150" r="60" fill="white" opacity="0.06" />
      {/* People */}
      <circle cx="80" cy="90" r="16" fill="white" opacity="0.9" />
      <circle cx="80" cy="83" r="7" fill="#e0e7ff" />
      <path d="M65 112 C65 102, 95 102, 95 112 L95 125 Q95 128 80 128 Q65 128 65 125Z" fill="white" opacity="0.9" />
      <circle cx="150" cy="75" r="20" fill="white" opacity="0.95" />
      <circle cx="150" cy="66" r="9" fill="#e0e7ff" />
      <path d="M132 100 C132 88, 168 88, 168 100 L168 118 Q168 122 150 122 Q132 122 132 118Z" fill="white" opacity="0.95" />
      <circle cx="220" cy="90" r="16" fill="white" opacity="0.9" />
      <circle cx="220" cy="83" r="7" fill="#e0e7ff" />
      <path d="M205 112 C205 102, 235 102, 235 112 L235 125 Q235 128 220 128 Q205 128 205 125Z" fill="white" opacity="0.9" />
      {/* Chart bars */}
      <rect x="100" y="145" width="16" height="35" rx="4" fill="white" opacity="0.3" />
      <rect x="122" y="135" width="16" height="45" rx="4" fill="white" opacity="0.4" />
      <rect x="144" y="125" width="16" height="55" rx="4" fill="white" opacity="0.5" />
      <rect x="166" y="140" width="16" height="40" rx="4" fill="white" opacity="0.35" />
      <rect x="188" y="130" width="16" height="50" rx="4" fill="white" opacity="0.45" />
    </svg>
  )
}
