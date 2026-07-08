import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mocks MUST come before imports
vi.mock('@/lib/db', () => ({
  prisma: {
    announcement: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    membership: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
}))

vi.mock('@/lib/tenant', () => ({
  requireTenant: vi.fn(),
}))

vi.mock('@/lib/rbac', () => ({
  assertAtLeast: vi.fn(),
}))

vi.mock('@/lib/paywall', () => ({
  requireWriteAccess: vi.fn(),
}))

vi.mock('@/lib/audit', () => ({
  logAudit: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

import { createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../actions'
import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { requireWriteAccess } from '@/lib/paywall'

const mockRequireTenant = requireTenant as ReturnType<typeof vi.fn>
const mockAssertAtLeast = assertAtLeast as ReturnType<typeof vi.fn>
const mockRequireWriteAccess = requireWriteAccess as ReturnType<typeof vi.fn>
const mockCreate = prisma.announcement.create as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.announcement.findFirst as ReturnType<typeof vi.fn>
const mockUpdate = prisma.announcement.update as ReturnType<typeof vi.fn>
const mockDelete = prisma.announcement.delete as ReturnType<typeof vi.fn>

const tenantContext = {
  tenant: { id: 't1' },
  membership: { role: 'ADMIN' },
  user: { userId: 'u1' },
}

const validData = { title: 'Test', content: 'Hello world' }

describe('Announcement actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRequireTenant.mockResolvedValue(tenantContext)
    mockAssertAtLeast.mockReturnValue(undefined)
    mockRequireWriteAccess.mockResolvedValue(undefined)
  })

  // (#201) The actions now return ActionResult instead of throwing.
  // RBAC / paywall errors still throw because they're not UserError.
  describe('RBAC guard', () => {
    it('rejects when assertAtLeast throws', async () => {
      mockAssertAtLeast.mockImplementation(() => {
        throw new Error('Forbidden')
      })
      await expect(createAnnouncement('acme', validData)).rejects.toThrow('Forbidden')
    })
  })

  describe('Paywall guard', () => {
    it('rejects when requireWriteAccess throws', async () => {
      mockRequireWriteAccess.mockRejectedValue(new Error('SUBSCRIPTION_REQUIRED'))
      await expect(createAnnouncement('acme', validData)).rejects.toThrow('SUBSCRIPTION_REQUIRED')
    })
  })

  describe('createAnnouncement', () => {
    it('returns ok with id on successful creation', async () => {
      mockCreate.mockResolvedValue({ id: 'ann-1' })
      const result = await createAnnouncement('acme', validData)
      expect(result).toEqual({ ok: true, data: { id: 'ann-1' } })
      expect(mockCreate).toHaveBeenCalledOnce()
    })
  })

  describe('updateAnnouncement', () => {
    it('updates when announcement exists', async () => {
      mockFindFirst.mockResolvedValue({ id: 'ann-1', tenantId: 't1' })
      mockUpdate.mockResolvedValue({ id: 'ann-1' })
      const result = await updateAnnouncement('acme', 'ann-1', validData)
      expect(result).toEqual({ ok: true })
      expect(mockUpdate).toHaveBeenCalledOnce()
    })

    it('returns user error when announcement not found', async () => {
      mockFindFirst.mockResolvedValue(null)
      const result = await updateAnnouncement('acme', 'ann-1', validData)
      expect(result).toEqual({ ok: false, error: 'Announcement not found' })
    })
  })

  describe('deleteAnnouncement', () => {
    it('deletes when announcement exists', async () => {
      mockFindFirst.mockResolvedValue({ id: 'ann-1', tenantId: 't1' })
      mockDelete.mockResolvedValue({ id: 'ann-1' })
      const result = await deleteAnnouncement('acme', 'ann-1')
      expect(result).toEqual({ ok: true })
      expect(mockDelete).toHaveBeenCalledOnce()
    })

    it('returns user error when announcement not found', async () => {
      mockFindFirst.mockResolvedValue(null)
      const result = await deleteAnnouncement('acme', 'ann-1')
      expect(result).toEqual({ ok: false, error: 'Announcement not found' })
    })
  })
})
