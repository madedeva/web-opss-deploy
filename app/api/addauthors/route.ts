import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Authors } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    try {
        const body: Authors = await request.json();

        console.log("Received data:", body);

        const submission = await prisma.registerConference.findUnique({
            where: { id: body.submissionId },
        });

        if (!submission) {
            return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
        }

        const authors = await prisma.authors.create({
            data: {
                name: body.name,
                email: body.email,
                institution: body.institution,
                submissionId: body.submissionId,
            },
        });

        return NextResponse.json(authors, { status: 201 });
    } catch (error) {
        console.error("Error creating author:", error);
        return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
    }
};
