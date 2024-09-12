import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {User} from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    const reviewer = await prisma.user.findMany({
        where: {
            roleId: 3
        }
    });

    return NextResponse.json(reviewer, {status: 200});
}