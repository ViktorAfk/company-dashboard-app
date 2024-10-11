-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshToken_key" ON "Token"("refreshToken");
