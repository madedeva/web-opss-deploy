/*
  Warnings:

  - You are about to drop the `ReviewPaper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReviewPaper" DROP CONSTRAINT "ReviewPaper_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewPaper" DROP CONSTRAINT "ReviewPaper_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_registerconferenceId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- AlterTable
ALTER TABLE "RegisterConference" ADD COLUMN     "abstract" TEXT,
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "conrevId" INTEGER,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "paper" TEXT,
ADD COLUMN     "paper_title" TEXT,
ADD COLUMN     "topic" TEXT;

-- DropTable
DROP TABLE "ReviewPaper";

-- DropTable
DROP TABLE "Submission";

-- AddForeignKey
ALTER TABLE "RegisterConference" ADD CONSTRAINT "RegisterConference_conrevId_fkey" FOREIGN KEY ("conrevId") REFERENCES "Con_Reviewer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
