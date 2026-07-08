import { describe, it, expect } from 'vitest'
import { assertRole, hasRole, isAtLeast, assertAtLeast, ForbiddenError } from '../rbac'
import { Role } from '@/generated/prisma/client'

describe('assertRole', () => {
  it('allows OWNER when OWNER is in allowed list', () => {
    expect(() => assertRole({ role: Role.OWNER }, [Role.OWNER, Role.ADMIN])).not.toThrow()
  })

  it('denies EMPLOYEE when only OWNER/ADMIN allowed', () => {
    expect(() => assertRole({ role: Role.EMPLOYEE }, [Role.OWNER, Role.ADMIN])).toThrow(ForbiddenError)
  })

  it('provides helpful error message on denial', () => {
    expect(() => assertRole({ role: Role.MANAGER }, [Role.OWNER])).toThrow(
      "Role 'MANAGER' is not allowed. Required: OWNER"
    )
  })

  it.each([
    [Role.OWNER, [Role.OWNER], true],
    [Role.ADMIN, [Role.OWNER, Role.ADMIN], true],
    [Role.MANAGER, [Role.OWNER, Role.ADMIN], false],
    [Role.EMPLOYEE, [Role.EMPLOYEE], true],
    [Role.EMPLOYEE, [Role.MANAGER], false],
  ])('role %s with allowed %j → %s', (role, allowed, shouldPass) => {
    if (shouldPass) {
      expect(() => assertRole({ role }, allowed)).not.toThrow()
    } else {
      expect(() => assertRole({ role }, allowed)).toThrow(ForbiddenError)
    }
  })
})

describe('hasRole', () => {
  it('returns true when role matches', () => {
    expect(hasRole({ role: Role.ADMIN }, [Role.ADMIN, Role.OWNER])).toBe(true)
  })
  it('returns false when role does not match', () => {
    expect(hasRole({ role: Role.EMPLOYEE }, [Role.ADMIN])).toBe(false)
  })
})

describe('isAtLeast / assertAtLeast', () => {
  it('OWNER is at least MANAGER', () => {
    expect(isAtLeast({ role: Role.OWNER }, Role.MANAGER)).toBe(true)
  })
  it('EMPLOYEE is not at least MANAGER', () => {
    expect(isAtLeast({ role: Role.EMPLOYEE }, Role.MANAGER)).toBe(false)
  })
  it('assertAtLeast throws for insufficient role', () => {
    expect(() => assertAtLeast({ role: Role.EMPLOYEE }, Role.ADMIN)).toThrow(ForbiddenError)
  })
  it('assertAtLeast passes for sufficient role', () => {
    expect(() => assertAtLeast({ role: Role.OWNER }, Role.ADMIN)).not.toThrow()
  })
})
