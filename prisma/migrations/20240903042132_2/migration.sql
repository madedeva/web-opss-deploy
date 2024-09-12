-- CreateTable
CREATE TABLE "Authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Authors" ADD CONSTRAINT "Authors_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "RegisterConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
