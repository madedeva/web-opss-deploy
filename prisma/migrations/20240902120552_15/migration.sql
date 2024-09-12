/*
  Warnings:

  - You are about to drop the column `authors` on the `RegisterConference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RegisterConference" DROP COLUMN "authors";

-- CreateTable
CREATE TABLE "AuthorInstitution" (
    "id" SERIAL NOT NULL,
    "authorName" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "AuthorInstitution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthorInstitution" ADD CONSTRAINT "AuthorInstitution_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "RegisterConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
