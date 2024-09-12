import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const con = await prisma.user.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}
