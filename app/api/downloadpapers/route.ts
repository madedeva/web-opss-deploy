import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const conferenceId = url.searchParams.get('conferenceId');

    if (!conferenceId) {
        return NextResponse.json({ status: 'fail', error: 'Conference ID is required' }, { status: 400 });
    }

    try {
        const papers = await prisma.registerConference.findMany({
            where: {
                conferenceId: Number(conferenceId),
            },
            select: {
                paper_title: true,
                paper: true,
            },
        });

        if (!papers || papers.length === 0) {
            return NextResponse.json({ status: 'fail', error: 'No papers found' }, { status: 404 });
        }

        return NextResponse.json(papers);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: 'fail', error: e }, { status: 500 });
    }
}
