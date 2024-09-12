/*
  Warnings:

  - Made the column `acronym` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `theme` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topic` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banner` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `venue` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paper_template` on table `Conference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payment_info` on table `Conference` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Conference" ALTER COLUMN "acronym" SET NOT NULL,
ALTER COLUMN "theme" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "topic" SET NOT NULL,
ALTER COLUMN "banner" SET NOT NULL,
ALTER COLUMN "venue" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "institution" SET NOT NULL,
ALTER COLUMN "paper_template" SET NOT NULL,
ALTER COLUMN "payment_info" SET NOT NULL;
