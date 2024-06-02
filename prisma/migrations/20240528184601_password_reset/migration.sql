/*
  Warnings:

  - The primary key for the `verificationtokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `identifier` on the `verificationtokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `verificationtokens` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `verificationtokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "verificationtokens" DROP CONSTRAINT "verificationtokens_pkey",
DROP COLUMN "identifier",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "verificationtokens_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ResetPasswords" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswords_token_key" ON "ResetPasswords"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswords_token_email_key" ON "ResetPasswords"("token", "email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");
