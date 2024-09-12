/*
  Warnings:

  - You are about to drop the column `authorAccess` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerAccess` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authorAccess",
DROP COLUMN "reviewerAccess";
