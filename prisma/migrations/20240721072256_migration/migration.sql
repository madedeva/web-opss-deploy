/*
  Warnings:

  - Made the column `userId` on table `Conference` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Conference" DROP CONSTRAINT "Conference_userId_fkey";

-- AlterTable
ALTER TABLE "Conference" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
