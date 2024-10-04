-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_compnayId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_compnayId_fkey";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_compnayId_fkey" FOREIGN KEY ("compnayId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_compnayId_fkey" FOREIGN KEY ("compnayId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
