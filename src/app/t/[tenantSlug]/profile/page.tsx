import { getMyProfile } from './actions'
import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { ProfileEditForm } from './profile-edit-form'
import { ChangePasswordForm } from './change-password-form'
import { ExportDataButton } from './export-data-button'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { user } = await requireTenant(tenantSlug)
  const employee = await getMyProfile(tenantSlug)

  // Look up auth provider so the password card hides for OAuth-only
  // accounts (which can't change a password through us anyway).
  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { authProvider: true },
  })
  const isCredentialsAuth = dbUser?.authProvider === 'CREDENTIALS'

  if (!employee) {
    return (
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">Manage your personal information</p>
        <div className="max-w-2xl space-y-6">
          <CardSection>
            <p className="text-sm text-muted-foreground py-4">
              No employee record is linked to your account. Please contact your HR administrator.
            </p>
          </CardSection>
          {/* Even without an employee record, OWNER/ADMIN users still
              need to be able to change their password. */}
          {isCredentialsAuth && <ChangePasswordForm tenantSlug={tenantSlug} />}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">Manage your personal information</p>

      <div className="max-w-2xl space-y-6">
        <CardSection title="Your Details">
          <FieldRow label="Name" value={`${employee.firstName} ${employee.lastName}`} />
          <FieldRow label="Email" value={employee.email || '\u2014'} />
          <FieldRow label="Job Title" value={employee.jobTitle || '\u2014'} />
          <FieldRow label="Department" value={employee.department || '\u2014'} />
          <FieldRow label="Start Date" value={employee.startDate ? new Date(employee.startDate).toLocaleDateString('en-GB') : '\u2014'} />
        </CardSection>

        <ProfileEditForm
          tenantSlug={tenantSlug}
          defaultValues={{
            dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '',
            phone: employee.phone || '',
            address: employee.address || '',
            emergencyContactName: employee.emergencyContactName || '',
            emergencyContactPhone: employee.emergencyContactPhone || '',
          }}
        />

        {isCredentialsAuth && <ChangePasswordForm tenantSlug={tenantSlug} />}

        <CardSection title="Your Data">
          <p className="text-sm text-muted-foreground mb-4">
            Download a copy of all personal data we hold about you, including your employee record, leave requests, and leave balances.
          </p>
          <ExportDataButton tenantSlug={tenantSlug} />
        </CardSection>
      </div>
    </div>
  )
}
