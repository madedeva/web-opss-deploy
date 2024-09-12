-- CreateTable
CREATE TABLE "Conference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "acronym" TEXT,
    "theme" TEXT,
    "description" TEXT,
    "topic" TEXT,
    "banner" TEXT,
    "venue" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "email" TEXT,
    "institution" TEXT,
    "paper_template" TEXT,
    "payment_info" TEXT,
    "submission_deadline" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Con_Reviewer" (
    "id" SERIAL NOT NULL,
    "conferenceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Con_Reviewer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conference_slug_key" ON "Conference"("slug");

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Con_Reviewer" ADD CONSTRAINT "Con_Reviewer_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Con_Reviewer" ADD CONSTRAINT "Con_Reviewer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
