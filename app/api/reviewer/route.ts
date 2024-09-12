import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Con_Reviewer} from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    const body: Con_Reviewer = await request.json();

    const reviewer = await prisma.con_Reviewer.create({
        data: {
            userId: body.userId,
            conferenceId: body.conferenceId
        }
    });

    return NextResponse.json(reviewer, {status: 201});
}

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const conferenceId = searchParams.get("conferenceId");

    let reviewers;

    if (conferenceId) {
        reviewers = await prisma.con_Reviewer.findMany({
            where: {
                conferenceId: Number(conferenceId),
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                conference: true,
            },
        });
    } else {
        reviewers = await prisma.con_Reviewer.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                conference: true,
            },
        });
    }

    return NextResponse.json(reviewers, { status: 200 });
};