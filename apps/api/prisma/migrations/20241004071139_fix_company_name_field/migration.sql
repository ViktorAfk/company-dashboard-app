/*
  Warnings:

  - You are about to drop the column `compnayId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `compnayId` on the `Price` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_compnayId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_compnayId_fkey";

-- DropIndex
DROP INDEX "Location_compnayId_key";

-- DropIndex
DROP INDEX "Price_compnayId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "compnayId",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "compnayId",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_companyId_key" ON "Location"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_companyId_key" ON "Price"("companyId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
