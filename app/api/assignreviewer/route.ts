import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ReviewPaper } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    const body: ReviewPaper = await request.json();

    const reviewer = await prisma.reviewPaper.create({
        data: {
            ...body,
        }
    });

    return NextResponse.json(reviewer, {status: 201});
}