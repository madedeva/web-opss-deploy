import { NextResponse } from "next/server";
import { PrismaClient, RegisterConference } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export const PUT = async (request: Request, {params}: {params: {id: string}}) => {
    try {
        const body: RegisterConference = await request.json()
        const paperId = parseInt(params.id);

        if (isNaN(paperId)) {
            return NextResponse.json({ error: 'Invalid paperId' }, { status: 400 });
        }

        const submissions = await prisma.registerConference.update({
            where: {
                id: paperId,
            },
            data: {
                status: body.status,
                comments: body.comments
            }
        });

        return NextResponse.json(submissions, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch submissions', error);
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
}
