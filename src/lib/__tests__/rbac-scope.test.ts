import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock prisma BEFORE importing the module under test so the @/lib/db
// import inside rbac.ts resolves to the mocked client.
vi.mock('@/lib/db', () => ({
  prisma: {
    employee: {
      findFirst: vi.fn(),
    },
    approvalDelegate: {
      findFirst: vi.fn(),
    },
  },
}))

import { canManageEmployeeId } from '../rbac'
import { prisma } from '@/lib/db'
import { Role } from '@/generated/prisma/client'

const empFindFirst = prisma.employee.findFirst as ReturnType<typeof vi.fn>
const delegateFindFirst = prisma.approvalDelegate.findFirst as ReturnType<typeof vi.fn>

const T = 'tenant-A'
const ME_USER = 'user-me'
const TARGET_USER = 'user-target'
const ME_EMP = 'emp-me'
const TARGET_EMP = 'emp-target'
const OTHER_MANAGER_EMP = 'emp-other-manager'

describe('canManageEmployeeId', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delegateFindFirst.mockResolvedValue(null)
  })

  it('ADMIN sees everyone — no DB hit', async () => {
    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.ADMIN }, TARGET_EMP)
    expect(allowed).toBe(true)
    // No DB calls should be needed for the admin shortcut
    expect(empFindFirst).not.toHaveBeenCalled()
  })

  it('OWNER sees everyone — no DB hit', async () => {
    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.OWNER }, TARGET_EMP)
    expect(allowed).toBe(true)
    expect(empFindFirst).not.toHaveBeenCalled()
  })

  it('MANAGER sees their direct report', async () => {
    empFindFirst
      // First call: lookup target employee
      .mockResolvedValueOnce({ id: TARGET_EMP, userId: TARGET_USER, managerId: ME_EMP })
      // Second call: lookup caller's own employee row
      .mockResolvedValueOnce({ id: ME_EMP })

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.MANAGER }, TARGET_EMP)
    expect(allowed).toBe(true)
  })

  it('MANAGER cannot see an unrelated employee in the same tenant', async () => {
    empFindFirst
      // Target is managed by SOMEONE ELSE, not the caller
      .mockResolvedValueOnce({ id: TARGET_EMP, userId: TARGET_USER, managerId: OTHER_MANAGER_EMP })
      .mockResolvedValueOnce({ id: ME_EMP })

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.MANAGER }, TARGET_EMP)
    expect(allowed).toBe(false)
  })

  it('MANAGER acting on themselves is allowed (book own leave, etc.)', async () => {
    empFindFirst
      // Target IS the caller — userId match short-circuits
      .mockResolvedValueOnce({ id: ME_EMP, userId: ME_USER, managerId: OTHER_MANAGER_EMP })
      .mockResolvedValueOnce({ id: ME_EMP })

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.MANAGER }, ME_EMP)
    expect(allowed).toBe(true)
  })

  it('MANAGER with active delegation can manage the delegated manager\'s reports', async () => {
    empFindFirst
      .mockResolvedValueOnce({ id: TARGET_EMP, userId: TARGET_USER, managerId: OTHER_MANAGER_EMP })
      .mockResolvedValueOnce({ id: ME_EMP })

    delegateFindFirst.mockResolvedValueOnce({ id: 'delegation-1' })

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.MANAGER }, TARGET_EMP)
    expect(allowed).toBe(true)
  })

  it('EMPLOYEE acting on themselves is allowed', async () => {
    empFindFirst
      .mockResolvedValueOnce({ id: ME_EMP, userId: ME_USER, managerId: null })
      .mockResolvedValueOnce({ id: ME_EMP })

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.EMPLOYEE }, ME_EMP)
    expect(allowed).toBe(true)
  })

  it('EMPLOYEE acting on someone else is denied', async () => {
    empFindFirst
      .mockResolvedValueOnce({ id: TARGET_EMP, userId: TARGET_USER, managerId: ME_EMP })
      .mockResolvedValueOnce({ id: ME_EMP })

    // Even if the caller happens to be in a "manager" position (via the
    // managerId field), without the MANAGER role they can't act on others.
    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.EMPLOYEE }, TARGET_EMP)
    expect(allowed).toBe(false)
  })

  it('returns false when the target employee does not belong to the tenant', async () => {
    // Cross-tenant id leak — findFirst with the wrong tenantId returns null.
    empFindFirst.mockResolvedValueOnce(null)

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.MANAGER }, 'leaked-id-from-other-tenant')
    expect(allowed).toBe(false)
  })

  it('returns false when the caller has no employee row in the tenant', async () => {
    empFindFirst
      .mockResolvedValueOnce({ id: TARGET_EMP, userId: TARGET_USER, managerId: ME_EMP })
      // Caller's lookup returns nothing — they're a Membership without an Employee
      .mockResolvedValueOnce(null)

    const allowed = await canManageEmployeeId(T, ME_USER, { role: Role.MANAGER }, TARGET_EMP)
    expect(allowed).toBe(false)
  })
})
