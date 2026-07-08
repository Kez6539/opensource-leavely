-- RLS Hardening: enforce tenant isolation at the database level
-- The application sets `app.current_tenant_id` per request via SET LOCAL.

-- Helper function to get the current tenant id from session variable
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS TEXT AS $$
  SELECT COALESCE(current_setting('app.current_tenant_id', true), '');
$$ LANGUAGE sql STABLE;

-- Enable RLS and create policies for all tenant-scoped tables

-- Membership
ALTER TABLE "Membership" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Membership" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Membership"
  USING ("tenantId" = current_tenant_id());

-- Employee
ALTER TABLE "Employee" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Employee" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Employee"
  USING ("tenantId" = current_tenant_id());

-- LeavePolicy
ALTER TABLE "LeavePolicy" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LeavePolicy" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "LeavePolicy"
  USING ("tenantId" = current_tenant_id());

-- LeaveRequest
ALTER TABLE "LeaveRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LeaveRequest" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "LeaveRequest"
  USING ("tenantId" = current_tenant_id());

-- Document
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Document"
  USING ("tenantId" = current_tenant_id());

-- AuditLog
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "AuditLog"
  USING ("tenantId" = current_tenant_id());

-- Invite
ALTER TABLE "Invite" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invite" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Invite"
  USING ("tenantId" = current_tenant_id());

-- TenantBilling
ALTER TABLE "TenantBilling" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TenantBilling" FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "TenantBilling"
  USING ("tenantId" = current_tenant_id());
