-- CreateEnum
CREATE TYPE "ToilStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "LeaveStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "hoursPerDay" DOUBLE PRECISION,
ADD COLUMN     "leaveYearStartMonth" INTEGER;

-- AlterTable
ALTER TABLE "LeaveRequest" ADD COLUMN     "declineReason" TEXT,
ADD COLUMN     "fitNoteRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fitNoteUrl" TEXT,
ADD COLUMN     "reportedById" TEXT;

-- CreateTable
CREATE TABLE "WorkingTimePattern" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "isWorkingDay" BOOLEAN NOT NULL DEFAULT true,
    "startTime" TEXT,
    "endTime" TEXT,
    "hoursPerDay" DOUBLE PRECISION,

    CONSTRAINT "WorkingTimePattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnToWork" (
    "id" TEXT NOT NULL,
    "leaveRequestId" TEXT NOT NULL,
    "notes" TEXT,
    "conductedById" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReturnToWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToilAccrual" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "reason" TEXT,
    "status" "ToilStatus" NOT NULL DEFAULT 'PENDING',
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToilAccrual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkingTimePattern_employeeId_idx" ON "WorkingTimePattern"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingTimePattern_employeeId_dayOfWeek_key" ON "WorkingTimePattern"("employeeId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "ReturnToWork_leaveRequestId_key" ON "ReturnToWork"("leaveRequestId");

-- CreateIndex
CREATE INDEX "ToilAccrual_employeeId_idx" ON "ToilAccrual"("employeeId");

-- CreateIndex
CREATE INDEX "ToilAccrual_tenantId_idx" ON "ToilAccrual"("tenantId");

-- AddForeignKey
ALTER TABLE "WorkingTimePattern" ADD CONSTRAINT "WorkingTimePattern_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnToWork" ADD CONSTRAINT "ReturnToWork_leaveRequestId_fkey" FOREIGN KEY ("leaveRequestId") REFERENCES "LeaveRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToilAccrual" ADD CONSTRAINT "ToilAccrual_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToilAccrual" ADD CONSTRAINT "ToilAccrual_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
