-- Baseline for Sweep 2 (#139)
--
-- PURPOSE
-- ~24 models were added to schema.prisma over time but never got migration
-- files. On a fresh database, `prisma migrate deploy` fails because the
-- 20260408150000_cascade_fixes_sweep2 migration references tables (Review,
-- CourseEnrollment, CalendarToken) that have never been created.
--
-- This migration creates all previously un-migrated tables, enums, indexes
-- and foreign keys. It runs BEFORE 20260408150000_cascade_fixes_sweep2 on a
-- fresh DB so the later migration's ALTER TABLE statements can succeed.
--
-- PROD HANDLING
-- Production already has every table created ad-hoc via `db push` or manual
-- SQL. Do NOT run this on prod. Instead, after deploying these files run:
--
--     npx prisma migrate resolve --applied 20260408140000_baseline_sweep2
--
-- Prisma will then consider it applied without executing the SQL. Every
-- statement in this file uses `IF NOT EXISTS` (or is wrapped in a
-- conditional DO block) so it is *also* safe to execute by hand if needed.
--
-- TABLES COVERED
--   Goal, GoalUpdate, EmergencyContact, ExpenseClaim, Rota, ShiftTemplate,
--   RotaEntry, ClockEntry, Location, Partner, Commission, BlackoutDate,
--   ApprovalDelegate, CalendarToken, SignupLead, ReviewCycle, Review,
--   PushSubscription, Team, TeamMember, Course, CourseModule,
--   CourseEnrollment, DemoLead
--
-- NOTE: Tables Tenant, User, Membership, Employee, LeavePolicy, LeaveBalance,
-- LeaveRequest, PublicHoliday, CompanyLeave, Document, AuditLog, Invite,
-- PasswordReset, TenantBilling, OnboardingTemplate, OnboardingTemplateItem,
-- OnboardingChecklist, OnboardingTask, Announcement, EmployeeNote,
-- Notification, WorkingTimePattern, ReturnToWork and ToilAccrual already
-- have migration history and are NOT re-created here.

-- CreateEnum: GoalStatus
DO $$ BEGIN
  CREATE TYPE "GoalStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'ON_TRACK', 'OVERDUE', 'COMPLETED', 'MISSED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateEnum: ExpenseStatus
DO $$ BEGIN
  CREATE TYPE "ExpenseStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateEnum: ExpenseCategory
DO $$ BEGIN
  CREATE TYPE "ExpenseCategory" AS ENUM ('TRAVEL', 'MEALS', 'EQUIPMENT', 'ACCOMMODATION', 'TRAINING', 'OTHER');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateEnum: RotaStatus
DO $$ BEGIN
  CREATE TYPE "RotaStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable: Goal
CREATE TABLE IF NOT EXISTS "Goal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "GoalStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "assigneeId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable: GoalUpdate
CREATE TABLE IF NOT EXISTS "GoalUpdate" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "note" TEXT,
    "progress" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoalUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable: EmergencyContact
CREATE TABLE IF NOT EXISTS "EmergencyContact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "employeeId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ExpenseClaim
CREATE TABLE IF NOT EXISTS "ExpenseClaim" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "category" "ExpenseCategory" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "ExpenseStatus" NOT NULL DEFAULT 'PENDING',
    "receiptUrl" TEXT,
    "receiptData" TEXT,
    "receiptFilename" TEXT,
    "receiptMimeType" TEXT,
    "notes" TEXT,
    "employeeId" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Rota
CREATE TABLE IF NOT EXISTS "Rota" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "RotaStatus" NOT NULL DEFAULT 'DRAFT',
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ShiftTemplate
CREATE TABLE IF NOT EXISTS "ShiftTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#6366f1',
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShiftTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable: RotaEntry
CREATE TABLE IF NOT EXISTS "RotaEntry" (
    "id" TEXT NOT NULL,
    "rotaId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "shiftTemplateId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RotaEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ClockEntry
CREATE TABLE IF NOT EXISTS "ClockEntry" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clockIn" TIMESTAMP(3) NOT NULL,
    "clockOut" TIMESTAMP(3),
    "breakMinutes" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "totalHours" DECIMAL(65,30),
    "locationId" TEXT,
    "clockInLat" DECIMAL(65,30),
    "clockInLng" DECIMAL(65,30),
    "clockOutLat" DECIMAL(65,30),
    "clockOutLng" DECIMAL(65,30),
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClockEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Location
CREATE TABLE IF NOT EXISTS "Location" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "qrToken" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Partner
CREATE TABLE IF NOT EXISTS "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "referralCode" TEXT NOT NULL,
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.4,
    "status" TEXT NOT NULL DEFAULT 'active',
    "userId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Commission
-- Note: amount / revenue are still DOUBLE PRECISION. #142 (Float → Decimal)
-- was deferred because the downstream consumers in src/app/admin/actions.ts
-- and src/app/partners/actions.ts use `sum + c.amount` which breaks under
-- Prisma's Decimal type (needs Number(...) wrapping) and this fix pack is
-- not allowed to touch files outside prisma/**. Tenant FK is added in the
-- dedicated 20260408200000_commission_tenant_fk migration (#143).
CREATE TABLE IF NOT EXISTS "Commission" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "period" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable: BlackoutDate
CREATE TABLE IF NOT EXISTS "BlackoutDate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlackoutDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ApprovalDelegate
CREATE TABLE IF NOT EXISTS "ApprovalDelegate" (
    "id" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "delegateId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApprovalDelegate_pkey" PRIMARY KEY ("id")
);

-- CreateTable: CalendarToken
-- Note: FKs for userId and tenantId are added (idempotently) by the
-- 20260408150000_cascade_fixes_sweep2 migration which runs after this one.
CREATE TABLE IF NOT EXISTS "CalendarToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'personal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalendarToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SignupLead
CREATE TABLE IF NOT EXISTS "SignupLead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "company" TEXT,
    "source" TEXT NOT NULL DEFAULT 'register',
    "industry" TEXT,
    "convertedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignupLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ReviewCycle
CREATE TABLE IF NOT EXISTS "ReviewCycle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Review
-- Note: reviewerId FK is added (idempotently) by
-- 20260408150000_cascade_fixes_sweep2 which runs after this migration.
CREATE TABLE IF NOT EXISTS "Review" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "reviewerId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "overallRating" INTEGER,
    "strengths" TEXT,
    "improvements" TEXT,
    "notes" TEXT,
    "completedAt" TIMESTAMP(3),
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable: PushSubscription
CREATE TABLE IF NOT EXISTS "PushSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Team
CREATE TABLE IF NOT EXISTS "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "managerId" TEXT,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TeamMember
CREATE TABLE IF NOT EXISTS "TeamMember" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Course
CREATE TABLE IF NOT EXISTS "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "tenantId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable: CourseModule
CREATE TABLE IF NOT EXISTS "CourseModule" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable: CourseEnrollment
-- Note: userId FK is added (idempotently) by
-- 20260408150000_cascade_fixes_sweep2 which runs after this migration.
CREATE TABLE IF NOT EXISTS "CourseEnrollment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "totalModules" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3),
    "lastModuleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable: DemoLead
CREATE TABLE IF NOT EXISTS "DemoLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "employeeCount" TEXT NOT NULL,
    "currentSystem" TEXT,
    "industry" TEXT,
    "painPoint" TEXT NOT NULL,
    "painPointOther" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoLead_pkey" PRIMARY KEY ("id")
);

-- Tenant.referredBy → Partner. This FK was never migrated (Partner did not
-- exist in the original init migration).
ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "referredBy" TEXT;

-- CreateIndex: Goal
CREATE INDEX IF NOT EXISTS "Goal_tenantId_idx" ON "Goal"("tenantId");
CREATE INDEX IF NOT EXISTS "Goal_assigneeId_idx" ON "Goal"("assigneeId");

-- CreateIndex: GoalUpdate
CREATE INDEX IF NOT EXISTS "GoalUpdate_goalId_idx" ON "GoalUpdate"("goalId");

-- CreateIndex: EmergencyContact
CREATE INDEX IF NOT EXISTS "EmergencyContact_employeeId_idx" ON "EmergencyContact"("employeeId");
CREATE INDEX IF NOT EXISTS "EmergencyContact_tenantId_idx" ON "EmergencyContact"("tenantId");

-- CreateIndex: ExpenseClaim
CREATE INDEX IF NOT EXISTS "ExpenseClaim_tenantId_idx" ON "ExpenseClaim"("tenantId");
CREATE INDEX IF NOT EXISTS "ExpenseClaim_employeeId_idx" ON "ExpenseClaim"("employeeId");

-- CreateIndex: Rota
CREATE INDEX IF NOT EXISTS "Rota_tenantId_idx" ON "Rota"("tenantId");
CREATE INDEX IF NOT EXISTS "Rota_status_idx" ON "Rota"("status");

-- CreateIndex: ShiftTemplate
CREATE INDEX IF NOT EXISTS "ShiftTemplate_tenantId_idx" ON "ShiftTemplate"("tenantId");

-- CreateIndex: RotaEntry
CREATE INDEX IF NOT EXISTS "RotaEntry_rotaId_idx" ON "RotaEntry"("rotaId");
CREATE INDEX IF NOT EXISTS "RotaEntry_employeeId_idx" ON "RotaEntry"("employeeId");
CREATE INDEX IF NOT EXISTS "RotaEntry_date_idx" ON "RotaEntry"("date");

-- CreateIndex: ClockEntry
CREATE INDEX IF NOT EXISTS "ClockEntry_employeeId_idx" ON "ClockEntry"("employeeId");
CREATE INDEX IF NOT EXISTS "ClockEntry_tenantId_idx" ON "ClockEntry"("tenantId");
CREATE INDEX IF NOT EXISTS "ClockEntry_date_idx" ON "ClockEntry"("date");
CREATE UNIQUE INDEX IF NOT EXISTS "ClockEntry_employeeId_date_key" ON "ClockEntry"("employeeId", "date");

-- CreateIndex: Location
CREATE UNIQUE INDEX IF NOT EXISTS "Location_qrToken_key" ON "Location"("qrToken");
CREATE INDEX IF NOT EXISTS "Location_tenantId_idx" ON "Location"("tenantId");

-- CreateIndex: Partner
CREATE UNIQUE INDEX IF NOT EXISTS "Partner_email_key" ON "Partner"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Partner_referralCode_key" ON "Partner"("referralCode");
CREATE INDEX IF NOT EXISTS "Partner_referralCode_idx" ON "Partner"("referralCode");

-- CreateIndex: Commission
CREATE INDEX IF NOT EXISTS "Commission_partnerId_idx" ON "Commission"("partnerId");
CREATE INDEX IF NOT EXISTS "Commission_status_idx" ON "Commission"("status");
CREATE UNIQUE INDEX IF NOT EXISTS "Commission_partnerId_tenantId_period_key" ON "Commission"("partnerId", "tenantId", "period");

-- CreateIndex: BlackoutDate
CREATE INDEX IF NOT EXISTS "BlackoutDate_tenantId_idx" ON "BlackoutDate"("tenantId");

-- CreateIndex: ApprovalDelegate
CREATE INDEX IF NOT EXISTS "ApprovalDelegate_tenantId_idx" ON "ApprovalDelegate"("tenantId");
CREATE INDEX IF NOT EXISTS "ApprovalDelegate_managerId_idx" ON "ApprovalDelegate"("managerId");
CREATE INDEX IF NOT EXISTS "ApprovalDelegate_delegateId_idx" ON "ApprovalDelegate"("delegateId");

-- CreateIndex: CalendarToken
CREATE UNIQUE INDEX IF NOT EXISTS "CalendarToken_token_key" ON "CalendarToken"("token");
CREATE INDEX IF NOT EXISTS "CalendarToken_token_idx" ON "CalendarToken"("token");
CREATE INDEX IF NOT EXISTS "CalendarToken_userId_idx" ON "CalendarToken"("userId");

-- CreateIndex: SignupLead
CREATE INDEX IF NOT EXISTS "SignupLead_email_idx" ON "SignupLead"("email");
CREATE INDEX IF NOT EXISTS "SignupLead_createdAt_idx" ON "SignupLead"("createdAt");

-- CreateIndex: ReviewCycle
CREATE INDEX IF NOT EXISTS "ReviewCycle_tenantId_idx" ON "ReviewCycle"("tenantId");

-- CreateIndex: Review
CREATE INDEX IF NOT EXISTS "Review_tenantId_idx" ON "Review"("tenantId");
CREATE INDEX IF NOT EXISTS "Review_cycleId_idx" ON "Review"("cycleId");
CREATE UNIQUE INDEX IF NOT EXISTS "Review_cycleId_employeeId_key" ON "Review"("cycleId", "employeeId");

-- CreateIndex: PushSubscription
CREATE INDEX IF NOT EXISTS "PushSubscription_userId_idx" ON "PushSubscription"("userId");
CREATE INDEX IF NOT EXISTS "PushSubscription_tenantId_idx" ON "PushSubscription"("tenantId");
CREATE UNIQUE INDEX IF NOT EXISTS "PushSubscription_userId_endpoint_key" ON "PushSubscription"("userId", "endpoint");

-- CreateIndex: Team
CREATE INDEX IF NOT EXISTS "Team_tenantId_idx" ON "Team"("tenantId");

-- CreateIndex: TeamMember
CREATE INDEX IF NOT EXISTS "TeamMember_teamId_idx" ON "TeamMember"("teamId");
CREATE INDEX IF NOT EXISTS "TeamMember_employeeId_idx" ON "TeamMember"("employeeId");
CREATE UNIQUE INDEX IF NOT EXISTS "TeamMember_teamId_employeeId_key" ON "TeamMember"("teamId", "employeeId");

-- CreateIndex: Course
CREATE INDEX IF NOT EXISTS "Course_tenantId_idx" ON "Course"("tenantId");

-- CreateIndex: CourseModule
CREATE INDEX IF NOT EXISTS "CourseModule_courseId_idx" ON "CourseModule"("courseId");

-- CreateIndex: CourseEnrollment
CREATE INDEX IF NOT EXISTS "CourseEnrollment_userId_idx" ON "CourseEnrollment"("userId");
CREATE INDEX IF NOT EXISTS "CourseEnrollment_tenantId_idx" ON "CourseEnrollment"("tenantId");
CREATE UNIQUE INDEX IF NOT EXISTS "CourseEnrollment_courseId_userId_tenantId_key" ON "CourseEnrollment"("courseId", "userId", "tenantId");

-- AddForeignKey: Tenant.referredBy → Partner
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Tenant_referredBy_fkey' AND table_name = 'Tenant') THEN
    ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_referredBy_fkey" FOREIGN KEY ("referredBy") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Goal
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Goal_assigneeId_fkey' AND table_name = 'Goal') THEN
    ALTER TABLE "Goal" ADD CONSTRAINT "Goal_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Goal_tenantId_fkey' AND table_name = 'Goal') THEN
    ALTER TABLE "Goal" ADD CONSTRAINT "Goal_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: GoalUpdate
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'GoalUpdate_goalId_fkey' AND table_name = 'GoalUpdate') THEN
    ALTER TABLE "GoalUpdate" ADD CONSTRAINT "GoalUpdate_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: EmergencyContact
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'EmergencyContact_employeeId_fkey' AND table_name = 'EmergencyContact') THEN
    ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'EmergencyContact_tenantId_fkey' AND table_name = 'EmergencyContact') THEN
    ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: ExpenseClaim
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ExpenseClaim_employeeId_fkey' AND table_name = 'ExpenseClaim') THEN
    ALTER TABLE "ExpenseClaim" ADD CONSTRAINT "ExpenseClaim_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ExpenseClaim_tenantId_fkey' AND table_name = 'ExpenseClaim') THEN
    ALTER TABLE "ExpenseClaim" ADD CONSTRAINT "ExpenseClaim_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Rota
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Rota_tenantId_fkey' AND table_name = 'Rota') THEN
    ALTER TABLE "Rota" ADD CONSTRAINT "Rota_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: ShiftTemplate
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ShiftTemplate_tenantId_fkey' AND table_name = 'ShiftTemplate') THEN
    ALTER TABLE "ShiftTemplate" ADD CONSTRAINT "ShiftTemplate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: RotaEntry
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'RotaEntry_rotaId_fkey' AND table_name = 'RotaEntry') THEN
    ALTER TABLE "RotaEntry" ADD CONSTRAINT "RotaEntry_rotaId_fkey" FOREIGN KEY ("rotaId") REFERENCES "Rota"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'RotaEntry_employeeId_fkey' AND table_name = 'RotaEntry') THEN
    ALTER TABLE "RotaEntry" ADD CONSTRAINT "RotaEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'RotaEntry_shiftTemplateId_fkey' AND table_name = 'RotaEntry') THEN
    ALTER TABLE "RotaEntry" ADD CONSTRAINT "RotaEntry_shiftTemplateId_fkey" FOREIGN KEY ("shiftTemplateId") REFERENCES "ShiftTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: ClockEntry
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ClockEntry_employeeId_fkey' AND table_name = 'ClockEntry') THEN
    ALTER TABLE "ClockEntry" ADD CONSTRAINT "ClockEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ClockEntry_locationId_fkey' AND table_name = 'ClockEntry') THEN
    ALTER TABLE "ClockEntry" ADD CONSTRAINT "ClockEntry_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ClockEntry_tenantId_fkey' AND table_name = 'ClockEntry') THEN
    ALTER TABLE "ClockEntry" ADD CONSTRAINT "ClockEntry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Location
-- Note: Location_tenantId_fkey is upgraded to CASCADE by
-- 20260408150000_cascade_fixes_sweep2. Create it here with the ORIGINAL
-- (RESTRICT) behaviour so the cascade upgrade in sweep2 is a real change.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Location_tenantId_fkey' AND table_name = 'Location') THEN
    ALTER TABLE "Location" ADD CONSTRAINT "Location_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Commission.partnerId. (tenantId FK is handled by #143.)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Commission_partnerId_fkey' AND table_name = 'Commission') THEN
    ALTER TABLE "Commission" ADD CONSTRAINT "Commission_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: BlackoutDate
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'BlackoutDate_tenantId_fkey' AND table_name = 'BlackoutDate') THEN
    ALTER TABLE "BlackoutDate" ADD CONSTRAINT "BlackoutDate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: ApprovalDelegate
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ApprovalDelegate_managerId_fkey' AND table_name = 'ApprovalDelegate') THEN
    ALTER TABLE "ApprovalDelegate" ADD CONSTRAINT "ApprovalDelegate_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ApprovalDelegate_delegateId_fkey' AND table_name = 'ApprovalDelegate') THEN
    ALTER TABLE "ApprovalDelegate" ADD CONSTRAINT "ApprovalDelegate_delegateId_fkey" FOREIGN KEY ("delegateId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ApprovalDelegate_tenantId_fkey' AND table_name = 'ApprovalDelegate') THEN
    ALTER TABLE "ApprovalDelegate" ADD CONSTRAINT "ApprovalDelegate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: ReviewCycle
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'ReviewCycle_tenantId_fkey' AND table_name = 'ReviewCycle') THEN
    ALTER TABLE "ReviewCycle" ADD CONSTRAINT "ReviewCycle_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Review (cycleId, employeeId, tenantId). reviewerId handled by sweep2.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Review_cycleId_fkey' AND table_name = 'Review') THEN
    ALTER TABLE "Review" ADD CONSTRAINT "Review_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "ReviewCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Review_employeeId_fkey' AND table_name = 'Review') THEN
    ALTER TABLE "Review" ADD CONSTRAINT "Review_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Review_tenantId_fkey' AND table_name = 'Review') THEN
    ALTER TABLE "Review" ADD CONSTRAINT "Review_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: PushSubscription
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'PushSubscription_tenantId_fkey' AND table_name = 'PushSubscription') THEN
    ALTER TABLE "PushSubscription" ADD CONSTRAINT "PushSubscription_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Team
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Team_managerId_fkey' AND table_name = 'Team') THEN
    ALTER TABLE "Team" ADD CONSTRAINT "Team_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Team_tenantId_fkey' AND table_name = 'Team') THEN
    ALTER TABLE "Team" ADD CONSTRAINT "Team_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: TeamMember
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'TeamMember_teamId_fkey' AND table_name = 'TeamMember') THEN
    ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'TeamMember_employeeId_fkey' AND table_name = 'TeamMember') THEN
    ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: Course
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Course_tenantId_fkey' AND table_name = 'Course') THEN
    ALTER TABLE "Course" ADD CONSTRAINT "Course_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: CourseModule
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CourseModule_courseId_fkey' AND table_name = 'CourseModule') THEN
    ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- AddForeignKey: CourseEnrollment (courseId, tenantId). userId FK handled by sweep2.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CourseEnrollment_courseId_fkey' AND table_name = 'CourseEnrollment') THEN
    ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'CourseEnrollment_tenantId_fkey' AND table_name = 'CourseEnrollment') THEN
    ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
