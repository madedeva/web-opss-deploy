/*
  Warnings:

  - Added the required column `authors` to the `RegisterConference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegisterConference" ADD COLUMN     "authors" TEXT NOT NULL;
