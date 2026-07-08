'use client'

import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Mail, Phone, User, MapPin, Heart, Shield } from 'lucide-react'
import { updatePersonalInfo, updateMedicalInfo, updateOwnContactDetails } from '../actions'

interface PersonalTabProps {
  tenantSlug: string
  employeeId: string
  employee: {
    title: string | null
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: string | null
    gender: string | null
    ethnicity: string | null
    email: string | null
    personalEmail: string | null
    phone: string | null
    homePhone: string | null
    workPhone: string | null
    workExtension: string | null
    address: string | null
    covidVaccinated: string | null
    medicalNotes: string | null
  }
  canManage: boolean
  isOwnProfile?: boolean
}

function formatDate(iso: string | null) {
  if (!iso) return '\u2014'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function PersonalTab({
  tenantSlug,
  employeeId,
  employee,
  canManage,
  isOwnProfile = false,
}: PersonalTabProps) {
  const router = useRouter()
  const reactId = useId()
  const ids = {
    personalEmail: `${reactId}-personal-email`,
    phone: `${reactId}-phone`,
    homePhone: `${reactId}-home-phone`,
    workPhone: `${reactId}-work-phone`,
    workExtension: `${reactId}-work-extension`,
    contactAddress: `${reactId}-contact-address`,
    title: `${reactId}-title`,
    middleName: `${reactId}-middle-name`,
    dateOfBirth: `${reactId}-dob`,
    gender: `${reactId}-gender`,
    ethnicity: `${reactId}-ethnicity`,
    personalAddress: `${reactId}-personal-address`,
    covid: `${reactId}-covid`,
    medicalNotes: `${reactId}-medical-notes`,
  }
  const [editingContact, setEditingContact] = useState(false)
  const [editingPersonal, setEditingPersonal] = useState(false)
  const [editingMedical, setEditingMedical] = useState(false)
  const [editingOwnContact, setEditingOwnContact] = useState(false)
  const [saving, setSaving] = useState(false)

  // Whether the contact edit button should be shown (managers, or employees viewing own profile)
  const canEditContact = canManage || isOwnProfile

  const [contactForm, setContactForm] = useState({
    personalEmail: employee.personalEmail || '',
    phone: employee.phone || '',
    homePhone: employee.homePhone || '',
    workPhone: employee.workPhone || '',
    workExtension: employee.workExtension || '',
    address: employee.address || '',
  })

  const [personalForm, setPersonalForm] = useState({
    title: employee.title || '',
    middleName: employee.middleName || '',
    dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '',
    gender: employee.gender || '',
    ethnicity: employee.ethnicity || '',
    address: employee.address || '',
  })

  const [medicalForm, setMedicalForm] = useState({
    covidVaccinated: employee.covidVaccinated || 'Not Specified',
    medicalNotes: employee.medicalNotes || '',
  })

  async function handleSaveContact() {
    setSaving(true)
    try {
      const result = canManage
        ? await updatePersonalInfo(tenantSlug, employeeId, {
            personalEmail: contactForm.personalEmail,
            phone: contactForm.phone,
            homePhone: contactForm.homePhone,
            workPhone: contactForm.workPhone,
            workExtension: contactForm.workExtension,
          })
        : await updateOwnContactDetails(tenantSlug, {
            personalEmail: contactForm.personalEmail,
            phone: contactForm.phone,
            homePhone: contactForm.homePhone,
            workPhone: contactForm.workPhone,
            workExtension: contactForm.workExtension,
            address: contactForm.address,
          })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setEditingContact(false)
      setEditingOwnContact(false)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save contact details')
    } finally { setSaving(false) }
  }

  async function handleSavePersonal() {
    setSaving(true)
    try {
      const result = await updatePersonalInfo(tenantSlug, employeeId, {
        title: personalForm.title,
        middleName: personalForm.middleName,
        dateOfBirth: personalForm.dateOfBirth,
        gender: personalForm.gender,
        ethnicity: personalForm.ethnicity,
        address: personalForm.address,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setEditingPersonal(false)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save personal details')
    } finally { setSaving(false) }
  }

  async function handleSaveMedical() {
    setSaving(true)
    try {
      const result = await updateMedicalInfo(tenantSlug, employeeId, medicalForm)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setEditingMedical(false)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save medical details')
    } finally { setSaving(false) }
  }

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <CardSection
        title="Contact Information"
        action={canEditContact && !editingContact && !editingOwnContact ? (
          <Button variant="ghost" size="xs" onClick={() => {
            if (canManage) { setEditingContact(true) } else { setEditingOwnContact(true) }
          }}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        ) : undefined}
      >
        {(editingContact || editingOwnContact) ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor={ids.personalEmail} className="text-xs">Personal Email</Label>
              <Input
                id={ids.personalEmail}
                type="email"
                value={contactForm.personalEmail}
                onChange={e => setContactForm(f => ({ ...f, personalEmail: e.target.value }))}
                placeholder="personal@email.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={ids.phone} className="text-xs">Mobile Phone</Label>
                <Input id={ids.phone} value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor={ids.homePhone} className="text-xs">Home Phone</Label>
                <Input id={ids.homePhone} value={contactForm.homePhone} onChange={e => setContactForm(f => ({ ...f, homePhone: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={ids.workPhone} className="text-xs">Work Phone</Label>
                <Input id={ids.workPhone} value={contactForm.workPhone} onChange={e => setContactForm(f => ({ ...f, workPhone: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor={ids.workExtension} className="text-xs">Extension</Label>
                <Input id={ids.workExtension} value={contactForm.workExtension} onChange={e => setContactForm(f => ({ ...f, workExtension: e.target.value }))} />
              </div>
            </div>
            {editingOwnContact && (
              <div>
                <Label htmlFor={ids.contactAddress} className="text-xs">Address</Label>
                <Textarea
                  id={ids.contactAddress}
                  rows={2}
                  value={contactForm.address}
                  onChange={e => setContactForm(f => ({ ...f, address: e.target.value }))}
                />
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={handleSaveContact} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              <Button size="sm" variant="outline" onClick={() => { setEditingContact(false); setEditingOwnContact(false) }}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</span>
              </div>
              <FieldRow label="Account email" value={
                employee.email ? (
                  <a href={`mailto:${employee.email}`} className="text-primary hover:underline">{employee.email}</a>
                ) : '\u2014'
              } />
              <FieldRow label="Personal email" value={
                employee.personalEmail ? (
                  <a href={`mailto:${employee.personalEmail}`} className="text-primary hover:underline">{employee.personalEmail}</a>
                ) : '\u2014'
              } />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</span>
              </div>
              <FieldRow label="Mobile" value={employee.phone || '\u2014'} />
              <FieldRow label="Home" value={employee.homePhone || '\u2014'} />
              <FieldRow label="Work" value={employee.workPhone ? `${employee.workPhone}${employee.workExtension ? ` ext. ${employee.workExtension}` : ''}` : '\u2014'} />
            </div>
          </div>
        )}
      </CardSection>

      {/* Personal Information */}
      <CardSection
        title="Personal Information"
        action={canManage && !editingPersonal ? (
          <Button variant="ghost" size="xs" onClick={() => setEditingPersonal(true)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        ) : undefined}
      >
        {editingPersonal ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor={ids.title} className="text-xs">Title</Label>
                <select
                  id={ids.title}
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm"
                  value={personalForm.title}
                  onChange={e => setPersonalForm(f => ({ ...f, title: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                  <option value="Mx">Mx</option>
                </select>
              </div>
              <div>
                <Label htmlFor={ids.middleName} className="text-xs">Middle Name</Label>
                <Input id={ids.middleName} value={personalForm.middleName} onChange={e => setPersonalForm(f => ({ ...f, middleName: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor={ids.dateOfBirth} className="text-xs">Date of Birth</Label>
                {/* (#191) Hard cap at today so a 2099 DOB can't corrupt
                    pro-rata or Bradford calculations. */}
                <Input
                  id={ids.dateOfBirth}
                  type="date"
                  min="1900-01-01"
                  max={new Date().toISOString().split('T')[0]}
                  value={personalForm.dateOfBirth}
                  onChange={e => setPersonalForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor={ids.gender} className="text-xs">Gender</Label>
                <select
                  id={ids.gender}
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm"
                  value={personalForm.gender}
                  onChange={e => setPersonalForm(f => ({ ...f, gender: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <Label htmlFor={ids.ethnicity} className="text-xs">Ethnicity</Label>
                <Input id={ids.ethnicity} value={personalForm.ethnicity} onChange={e => setPersonalForm(f => ({ ...f, ethnicity: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label htmlFor={ids.personalAddress} className="text-xs">Address</Label>
              <Textarea
                id={ids.personalAddress}
                rows={2}
                value={personalForm.address}
                onChange={e => setPersonalForm(f => ({ ...f, address: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={handleSavePersonal} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              <Button size="sm" variant="outline" onClick={() => setEditingPersonal(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Identity</span>
              </div>
              <FieldRow label="Title" value={employee.title || '\u2014'} />
              <FieldRow label="Full name" value={`${employee.title ? employee.title + ' ' : ''}${employee.firstName} ${employee.middleName ? employee.middleName + ' ' : ''}${employee.lastName}`} />
              <FieldRow label="Date of birth" value={formatDate(employee.dateOfBirth)} />
              <FieldRow label="Gender" value={employee.gender || '\u2014'} />
              <FieldRow label="Ethnicity" value={employee.ethnicity || '\u2014'} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</span>
              </div>
              <FieldRow label="Address" value={employee.address || '\u2014'} />
            </div>
          </div>
        )}
      </CardSection>

      {/* Medical Information */}
      <CardSection
        title="Medical Information"
        action={canManage && !editingMedical ? (
          <Button variant="ghost" size="xs" onClick={() => setEditingMedical(true)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        ) : undefined}
      >
        {editingMedical ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor={ids.covid} className="text-xs">COVID-19 Vaccination Status</Label>
              <select
                id={ids.covid}
                className="w-full h-9 rounded-md border bg-transparent px-3 text-sm"
                value={medicalForm.covidVaccinated}
                onChange={e => setMedicalForm(f => ({ ...f, covidVaccinated: e.target.value }))}
              >
                <option value="Not Specified">Not Specified</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partially">Partially</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <Label htmlFor={ids.medicalNotes} className="text-xs">Medical Notes</Label>
              <Textarea
                id={ids.medicalNotes}
                rows={3}
                value={medicalForm.medicalNotes}
                onChange={e => setMedicalForm(f => ({ ...f, medicalNotes: e.target.value }))}
                placeholder="Any relevant medical information..."
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={handleSaveMedical} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              <Button size="sm" variant="outline" onClick={() => setEditingMedical(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Health</span>
            </div>
            <FieldRow label="COVID vaccination" value={employee.covidVaccinated || 'Not Specified'} />
            <FieldRow label="Medical notes" value={employee.medicalNotes || '\u2014'} />
            <div className="flex items-center gap-1.5 mt-3 p-2 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50">
              <Shield className="h-3.5 w-3.5 text-amber-600" />
              <p className="text-[11px] text-amber-700 dark:text-amber-400">Medical information is sensitive data and is only visible to authorised personnel.</p>
            </div>
          </div>
        )}
      </CardSection>
    </div>
  )
}
