/*
  Warnings:

  - Added the required column `lastName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Confirmation" ADD COLUMN     "attendanceAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "lastName" TEXT NOT NULL;
