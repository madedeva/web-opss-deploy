-- AlterTable
ALTER TABLE "RegisterConference" ADD COLUMN     "con_ReviewerId" INTEGER;

-- CreateTable
CREATE TABLE "Con_Reviewer" (
    "id" SERIAL NOT NULL,
    "conferenceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Con_Reviewer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegisterConference" ADD CONSTRAINT "RegisterConference_con_ReviewerId_fkey" FOREIGN KEY ("con_ReviewerId") REFERENCES "Con_Reviewer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Con_Reviewer" ADD CONSTRAINT "Con_Reviewer_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Con_Reviewer" ADD CONSTRAINT "Con_Reviewer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
