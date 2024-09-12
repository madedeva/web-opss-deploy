import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

// export const config = {
//     api: {
//       bodyParser: false,
//     },
// };

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const GET = async (request: Request, {params}: {params: {slug: string}}) => {
    const con = await prisma.conference.findUnique({
        where: {
            slug: params.slug
        }
    });

    return NextResponse.json(con, {status: 200});
}