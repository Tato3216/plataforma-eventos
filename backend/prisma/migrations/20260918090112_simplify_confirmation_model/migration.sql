/*
  Warnings:

  - You are about to drop the column `productDiscount` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `productDiscountPct` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `productSubtotal` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `productTotal` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `serviceDiscount` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `serviceDiscountPct` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `serviceSubtotal` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `serviceTotal` on the `Confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `ConfirmationProduct` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `ConfirmationService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Confirmation" DROP COLUMN "productDiscount",
DROP COLUMN "productDiscountPct",
DROP COLUMN "productSubtotal",
DROP COLUMN "productTotal",
DROP COLUMN "serviceDiscount",
DROP COLUMN "serviceDiscountPct",
DROP COLUMN "serviceSubtotal",
DROP COLUMN "serviceTotal";

-- AlterTable
ALTER TABLE "ConfirmationProduct" DROP COLUMN "unitPrice";

-- AlterTable
ALTER TABLE "ConfirmationService" DROP COLUMN "unitPrice";
