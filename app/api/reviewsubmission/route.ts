import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Explicitly mark the route as dynamic to avoid static rendering issues
export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const userId = Number(url.searchParams.get('userId'));

        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
        }

        const submissions = await prisma.registerConference.findMany({
            where: {
                ReviewPaper: {
                    some: {
                        reviewerId: userId
                    }
                }
            },
            include: {
                conference: true,
                ReviewPaper: true,
            }
        });

        console.log(submissions);
        return NextResponse.json(submissions, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch submissions', error);
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
};
