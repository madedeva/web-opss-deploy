/*
  Warnings:

  - Made the column `abstract` on table `RegisterConference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keywords` on table `RegisterConference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paper` on table `RegisterConference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paper_title` on table `RegisterConference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topic` on table `RegisterConference` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RegisterConference" ALTER COLUMN "abstract" SET NOT NULL,
ALTER COLUMN "keywords" SET NOT NULL,
ALTER COLUMN "paper" SET NOT NULL,
ALTER COLUMN "paper_title" SET NOT NULL,
ALTER COLUMN "topic" SET NOT NULL;
