/*
  Warnings:

  - You are about to alter the column `capital` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "capital" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Price" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
