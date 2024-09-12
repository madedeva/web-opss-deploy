import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, {status: 200});
}