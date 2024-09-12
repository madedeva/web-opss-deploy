/*
  Warnings:

  - Added the required column `institution` to the `RegisterConference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegisterConference" ADD COLUMN     "institution" TEXT NOT NULL;
