import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {User} from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const paperId = Number(url.searchParams.get('paperId'));

    if (isNaN(paperId)) {
        return NextResponse.json({ error: 'Invalid paperId' }, { status: 400 });
    }

    const reviewers = await prisma.user.findMany({
        where: {
            Con_Reviewer: {
                some: {
                    conferenceId: paperId,
                },
            },
        },
        include: {
            Con_Reviewer: true, // Mengembalikan data terkait dari tabel Con_Reviewer jika diperlukan
        },
    });

    return NextResponse.json(reviewers, {status: 200});
}
