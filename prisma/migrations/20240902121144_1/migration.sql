/*
  Warnings:

  - You are about to drop the `AuthorInstitution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthorInstitution" DROP CONSTRAINT "AuthorInstitution_submissionId_fkey";

-- DropTable
DROP TABLE "AuthorInstitution";
