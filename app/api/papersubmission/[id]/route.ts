import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const papers = await prisma.registerConference.findMany({
            include:{
                conference: {
                    include: {
                      User: {
                        select: {
                          id: true,
                          name: true,
                          email: true,
                        },
                      },
                    },
                  },
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                }
            });
        return NextResponse.json(papers);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}
