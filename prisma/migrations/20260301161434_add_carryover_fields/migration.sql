-- AlterTable
ALTER TABLE "LeavePolicy" ADD COLUMN     "carryoverExpiryMonths" INTEGER,
ADD COLUMN     "maxCarryoverDays" INTEGER NOT NULL DEFAULT 0;
