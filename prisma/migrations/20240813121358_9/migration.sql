/*
  Warnings:

  - You are about to drop the column `conrevId` on the `RegisterConference` table. All the data in the column will be lost.
  - You are about to drop the `Con_Reviewer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Con_Reviewer" DROP CONSTRAINT "Con_Reviewer_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "Con_Reviewer" DROP CONSTRAINT "Con_Reviewer_userId_fkey";

-- DropForeignKey
ALTER TABLE "RegisterConference" DROP CONSTRAINT "RegisterConference_conrevId_fkey";

-- AlterTable
ALTER TABLE "RegisterConference" DROP COLUMN "conrevId";

-- DropTable
DROP TABLE "Con_Reviewer";

-- CreateTable
CREATE TABLE "ReviewPaper" (
    "id" SERIAL NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "registerConferenceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewPaper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewPaper_reviewerId_registerConferenceId_key" ON "ReviewPaper"("reviewerId", "registerConferenceId");

-- AddForeignKey
ALTER TABLE "ReviewPaper" ADD CONSTRAINT "ReviewPaper_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewPaper" ADD CONSTRAINT "ReviewPaper_registerConferenceId_fkey" FOREIGN KEY ("registerConferenceId") REFERENCES "RegisterConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
