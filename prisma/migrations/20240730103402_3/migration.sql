/*
  Warnings:

  - Made the column `conferenceId` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_conferenceId_fkey";

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "conferenceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
