'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { CardSection } from '@/components/shared/card-section'
import { EmptyState } from '@/components/shared/empty-state'
import { ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MapPin, Plus, QrCode, Printer, ToggleLeft, ToggleRight, Trash2, Copy, ExternalLink, AlertTriangle } from 'lucide-react'
import { createLocation, toggleLocationActive, deleteLocation } from './actions'
import { getQrCodeUrl } from '@/lib/qr'

interface LocationRow {
  id: string
  name: string
  address: string | null
  latitude: number | null
  longitude: number | null
  qrToken: string
  isActive: boolean
  createdAt: string
  clockEntryCount: number
}

interface Props {
  tenantSlug: string
  locations: LocationRow[]
  isAdmin: boolean
  clockInEnabled: boolean
}

function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://leavely.online'
}

function getClockInUrl(qrToken: string): string {
  return `${getBaseUrl()}/clock/${qrToken}`
}

export function LocationsClient({ tenantSlug, locations, isAdmin, clockInEnabled }: Props) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showQrDialog, setShowQrDialog] = useState<LocationRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<LocationRow | null>(null)
  const [isPending, startTransition] = useTransition()

  // Create form state
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  function resetForm() {
    setName('')
    setAddress('')
    setLatitude('')
    setLongitude('')
  }

  function handleCreate() {
    if (!name.trim()) {
      toast.error('Location name is required')
      return
    }
    startTransition(async () => {
      const result = await createLocation(tenantSlug, {
        name: name.trim(),
        address: address.trim() || undefined,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Location created')
      setShowCreateDialog(false)
      resetForm()
    })
  }

  function handleToggleActive(location: LocationRow) {
    startTransition(async () => {
      const result = await toggleLocationActive(tenantSlug, location.id, !location.isActive)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success(location.isActive ? 'Location deactivated' : 'Location reactivated')
    })
  }

  // (#151) Native confirm() replaced with the shared shadcn ConfirmDialog
  // for consistency with the rest of the destructive flows.
  function handleDelete(location: LocationRow) {
    setDeleteTarget(location)
  }
  function confirmDelete() {
    if (!deleteTarget) return
    const target = deleteTarget
    startTransition(async () => {
      const result = await deleteLocation(tenantSlug, target.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Location deleted')
      setDeleteTarget(null)
    })
  }

  function handleCopyUrl(qrToken: string) {
    const url = getClockInUrl(qrToken)
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Clock-in URL copied to clipboard')
    }).catch(() => {
      toast.error('Failed to copy URL')
    })
  }

  function handlePrint(location: LocationRow) {
    const url = getClockInUrl(location.qrToken)
    const qrImageUrl = getQrCodeUrl(url, 400)
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      toast.error('Pop-up blocked. Please allow pop-ups for this site.')
      return
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${location.name}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              text-align: center;
            }
            .container {
              padding: 40px;
              max-width: 600px;
            }
            h1 { font-size: 28px; margin-bottom: 8px; }
            .address { font-size: 18px; color: #666; margin-bottom: 32px; }
            .qr-img { width: 400px; height: 400px; margin-bottom: 24px; }
            .instruction { font-size: 20px; font-weight: 600; color: #059669; margin-bottom: 16px; }
            .url { font-size: 12px; color: #999; word-break: break-all; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${location.name}</h1>
            ${location.address ? `<p class="address">${location.address}</p>` : ''}
            <p class="instruction">Scan to Clock In / Out</p>
            <img class="qr-img" src="${qrImageUrl}" alt="QR Code" />
            <p class="url">${url}</p>
          </div>
          <script>
            document.querySelector('.qr-img').onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  if (!clockInEnabled) {
    return (
      <CardSection>
        <div className="flex items-start gap-3 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Clock-in & Locations is disabled</p>
            <p className="text-sm text-muted-foreground mt-1">
              Enable the Clock-in & Locations feature in{' '}
              <a href={`/t/${tenantSlug}/settings/general`} className="text-primary hover:underline">
                General Settings
              </a>{' '}
              to manage locations and QR codes.
            </p>
          </div>
        </div>
      </CardSection>
    )
  }

  return (
    <div className="space-y-6">
      <CardSection
        title="Locations"
        description="Manage clock-in locations and QR codes for your team"
        action={
          isAdmin ? (
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Location</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="loc-name">Name *</Label>
                    <Input
                      id="loc-name"
                      placeholder="e.g. Head Office, Client Site A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loc-address">Address</Label>
                    <Input
                      id="loc-address"
                      placeholder="e.g. 123 High Street, London"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="loc-lat">Latitude (optional)</Label>
                      <Input
                        id="loc-lat"
                        type="number"
                        step="any"
                        placeholder="e.g. 51.5074"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loc-lng">Longitude (optional)</Label>
                      <Input
                        id="loc-lng"
                        type="number"
                        step="any"
                        placeholder="e.g. -0.1278"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lat/lng are optional and for reference only. GPS coordinates are captured automatically when employees clock in.
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => { setShowCreateDialog(false); resetForm() }}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={isPending || !name.trim()}>
                      {isPending ? 'Creating...' : 'Create Location'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : undefined
        }
      >
        {locations.length === 0 ? (
          <EmptyState
            icon={<MapPin className="h-10 w-10" />}
            title="No locations yet"
            description="Add your first location to generate a QR code for clock-in."
          />
        ) : (
          <div className="rounded-lg border shadow-sm overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Clock-ins</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((loc) => (
                  <TableRow key={loc.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium">{loc.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {loc.address || '\u2014'}
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">
                      {loc.clockEntryCount > 0 ? (
                        <span className="font-medium">{loc.clockEntryCount}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={loc.isActive ? 'default' : 'secondary'}>
                        {loc.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowQrDialog(loc)}
                          title="View QR code"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyUrl(loc.qrToken)}
                          title="Copy clock-in URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrint(loc)}
                          title="Print QR code"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        {isAdmin && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(loc)}
                              disabled={isPending}
                              title={loc.isActive ? 'Deactivate' : 'Reactivate'}
                            >
                              {loc.isActive ? (
                                <ToggleRight className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(loc)}
                              disabled={isPending || loc.clockEntryCount > 0}
                              title={loc.clockEntryCount > 0 ? `Cannot delete — ${loc.clockEntryCount} clock-ins exist. Deactivate instead.` : 'Delete location'}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:text-muted-foreground disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardSection>

      {/* QR Code Dialog */}
      {showQrDialog && (
        <Dialog open={!!showQrDialog} onOpenChange={() => setShowQrDialog(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{showQrDialog.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              {showQrDialog.address && (
                <p className="text-sm text-muted-foreground">{showQrDialog.address}</p>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getQrCodeUrl(getClockInUrl(showQrDialog.qrToken), 300)}
                alt={`QR code for ${showQrDialog.name}`}
                width={300}
                height={300}
                className="rounded-lg border"
              />
              <p className="text-xs text-muted-foreground text-center break-all">
                {getClockInUrl(showQrDialog.qrToken)}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyUrl(showQrDialog.qrToken)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePrint(showQrDialog)}
                >
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(getClockInUrl(showQrDialog.qrToken), '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={deleteTarget ? `Delete "${deleteTarget.name}"?` : 'Delete location?'}
        description="This cannot be undone. Existing clock-in entries will keep referencing this location, but new clock-ins will fail."
        onConfirm={confirmDelete}
        loading={isPending}
      />
    </div>
  )
}
