/*
  Warnings:

  - Made the column `authors` on table `RegisterConference` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RegisterConference" ALTER COLUMN "authors" SET NOT NULL;
