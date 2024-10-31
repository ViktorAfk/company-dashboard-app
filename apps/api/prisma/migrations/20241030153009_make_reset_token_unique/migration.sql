/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `ResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_resetToken_key" ON "ResetToken"("resetToken");
