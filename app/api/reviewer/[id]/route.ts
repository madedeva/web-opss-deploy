import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Con_Reviewer} from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
    const body: Con_Reviewer = await request.json();
    const Can_Reviewer = await prisma.con_Reviewer.update({
        where: {
            id: Number(params.id)
        },
        data: {
            userId: body.userId,
            conferenceId: body.conferenceId
        }
    });

    return NextResponse.json(Can_Reviewer, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const Can_Reviewer = await prisma.con_Reviewer.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(Can_Reviewer, {status: 200});
}