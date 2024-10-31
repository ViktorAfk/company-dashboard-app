/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_userId_key" ON "ResetToken"("userId");
