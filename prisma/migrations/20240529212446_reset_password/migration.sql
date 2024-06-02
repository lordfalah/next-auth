/*
  Warnings:

  - You are about to drop the `ResetPasswords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ResetPasswords";

-- CreateTable
CREATE TABLE "resetPasswords" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resetPasswords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resetPasswords_token_key" ON "resetPasswords"("token");

-- CreateIndex
CREATE UNIQUE INDEX "resetPasswords_token_email_key" ON "resetPasswords"("token", "email");
