/*
  Warnings:

  - You are about to drop the column `submission_deadline` on the `Conference` table. All the data in the column will be lost.
  - Added the required column `submission_deadlineEnd` to the `Conference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submission_deadlineStart` to the `Conference` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Conference" DROP COLUMN "submission_deadline",
ADD COLUMN     "submission_deadlineEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "submission_deadlineStart" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
