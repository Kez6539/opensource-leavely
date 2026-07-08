-- CompanyLeave: opt-in allowance deduction + policy link
ALTER TABLE "CompanyLeave"
  ADD COLUMN "deductFromAllowance" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "policyId" TEXT;

ALTER TABLE "CompanyLeave"
  ADD CONSTRAINT "CompanyLeave_policyId_fkey"
  FOREIGN KEY ("policyId") REFERENCES "LeavePolicy"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- LeaveRequest: back-pointer so we can reverse only auto-generated rows
ALTER TABLE "LeaveRequest"
  ADD COLUMN "companyLeaveId" TEXT;

ALTER TABLE "LeaveRequest"
  ADD CONSTRAINT "LeaveRequest_companyLeaveId_fkey"
  FOREIGN KEY ("companyLeaveId") REFERENCES "CompanyLeave"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "LeaveRequest_companyLeaveId_idx" ON "LeaveRequest"("companyLeaveId");
