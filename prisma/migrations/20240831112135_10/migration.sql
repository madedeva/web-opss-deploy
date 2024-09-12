-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authorAccess" TEXT NOT NULL DEFAULT 'false',
ADD COLUMN     "reviewerAccess" TEXT NOT NULL DEFAULT 'false';
