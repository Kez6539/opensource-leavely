'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CardSection } from '@/components/shared/card-section'
import { ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Phone, Mail, Trash2, Pencil, AlertTriangle, Shield, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { addEmergencyContact, updateEmergencyContact, deleteEmergencyContact } from '../actions'

interface EmergencyContactItem {
  id: string
  name: string
  relationship: string
  phone: string
  email: string | null
  isPrimary: boolean
}

interface EmergenciesTabProps {
  tenantSlug: string
  employeeId: string
  contacts: EmergencyContactItem[]
  canManage: boolean
}

interface ContactFormData {
  name: string
  relationship: string
  phone: string
  email: string
  isPrimary: boolean
}

const emptyForm: ContactFormData = {
  name: '',
  relationship: '',
  phone: '',
  email: '',
  isPrimary: false,
}

export function EmergenciesTab({
  tenantSlug,
  employeeId,
  contacts,
  canManage,
}: EmergenciesTabProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ContactFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<EmergencyContactItem | null>(null)

  function handleEdit(contact: EmergencyContactItem) {
    setEditingId(contact.id)
    setForm({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email || '',
      isPrimary: contact.isPrimary,
    })
    setShowForm(false)
  }

  function handleNew() {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const result = editingId
        ? await updateEmergencyContact(tenantSlug, editingId, form)
        : await addEmergencyContact(tenantSlug, employeeId, form)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save emergency contact')
    } finally { setSaving(false) }
  }

  // (#152) Replace native confirm() with the shared ConfirmDialog. The
  // contact's name is shown so the user knows exactly what they're about
  // to delete.
  function handleDeleteRequest(contact: EmergencyContactItem) {
    setDeleteTarget(contact)
  }
  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(deleteTarget.id)
    try {
      const result = await deleteEmergencyContact(tenantSlug, deleteTarget.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setDeleteTarget(null)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete emergency contact')
    } finally { setDeleting(null) }
  }

  return (
    <div className="space-y-6">
      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50">
        <AlertTriangle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Emergency Contacts</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-0.5">
            These contacts will be notified in case of an emergency. We recommend adding at least one primary contact.
          </p>
        </div>
      </div>

      {/* Add button */}
      {canManage && !showForm && !editingId && (
        <Button size="sm" onClick={handleNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add new contact
        </Button>
      )}

      {/* Add/Edit form */}
      {(showForm || editingId) && (
        <CardSection title={editingId ? 'Edit Emergency Contact' : 'Add Emergency Contact'}>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Name *</Label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label className="text-xs">Relationship *</Label>
                <select
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm"
                  value={form.relationship}
                  onChange={e => setForm(f => ({ ...f, relationship: e.target.value }))}
                >
                  <option value="">Select...</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Partner">Partner</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Phone *</Label>
                <Input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Email address (optional)"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPrimary}
                onChange={e => setForm(f => ({ ...f, isPrimary: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm">Primary contact</span>
            </label>
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving || !form.name || !form.relationship || !form.phone}
              >
                {saving ? 'Saving...' : editingId ? 'Update' : 'Add contact'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        </CardSection>
      )}

      {/* Contact list */}
      {contacts.length === 0 && !showForm ? (
        <CardSection>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 text-blue-400 shadow-sm">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">No emergency contacts</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Add emergency contacts to ensure we can reach someone in case of an emergency.
            </p>
          </div>
        </CardSection>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">{contact.name}</h4>
                      {contact.isPrimary && (
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{contact.relationship}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-primary hover:underline">
                        <Phone className="h-3.5 w-3.5" />
                        {contact.phone}
                      </a>
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-primary hover:underline">
                          <Mail className="h-3.5 w-3.5" />
                          {contact.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                {canManage && (
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleEdit(contact)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleDeleteRequest(contact)}
                      disabled={deleting === contact.id}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={deleteTarget ? `Delete ${deleteTarget.name}?` : 'Delete contact?'}
        description="This emergency contact will be removed permanently. You can re-add them later if needed."
        onConfirm={confirmDelete}
        loading={deleting === deleteTarget?.id}
      />
    </div>
  )
}
