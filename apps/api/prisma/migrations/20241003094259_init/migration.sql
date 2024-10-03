-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdDate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "zip" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "building" INTEGER NOT NULL,
    "compnayId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "compnayId" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_compnayId_key" ON "Location"("compnayId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_compnayId_key" ON "Price"("compnayId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_compnayId_fkey" FOREIGN KEY ("compnayId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_compnayId_fkey" FOREIGN KEY ("compnayId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
