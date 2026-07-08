interface FieldRowProps {
  label: string
  value: React.ReactNode
}

export function FieldRow({ label, value }: FieldRowProps) {
  return (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
