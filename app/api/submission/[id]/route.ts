import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {RegisterConference} from "@prisma/client";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';


export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try{
        const formData = await req.formData();

        const paper = formData.get("paper") as File;
        if (paper){
            const arrayBufferPaper = await paper.arrayBuffer();
            const bufferPaper = new Uint8Array(arrayBufferPaper);
            await fs.writeFile(`./public/uploads/papers/${paper.name}`, bufferPaper);
        }

        const conference = await prisma.conference.findUnique({
            where: {
              id: parseInt(formData.get("conferenceId")?.valueOf().toString() ?? '0'),
            }
          });
          
          if (!conference) {
            return NextResponse.json({ status: "fail", error: "Conference not found" });
          }

          const Authors = JSON.parse(formData.get("Authors")?.toString() ?? '[]');

        const updateRegisterConference = await prisma.registerConference.update({
            where: {
                id: Number(params.id),
            },
            data:{
                paper_title: formData.get("paper_title")?.valueOf().toString() ?? '',
                institution: formData.get("institution")?.valueOf().toString() ?? '',
                topic: formData.get("topic")?.valueOf().toString() ?? '',
                abstract: formData.get("abstract")?.valueOf().toString() ?? '',
                keywords: formData.get("keywords")?.valueOf().toString() ?? '',
                country: formData.get("country")?.valueOf().toString() ?? '',
                city: formData.get("city")?.valueOf().toString() ?? '',
                status: formData.get("status")?.valueOf().toString() ?? '',
                paper: paper.name,
                // userId: parseInt(formData.get("userId")?.valueOf().toString() ?? '0'),
                conferenceId: conference.id,
                Authors: {
                    upsert: Authors.map((author: any) => ({
                        where: { email: author.email }, // Assuming unique email for each author
                        update: {
                            name: author.name,
                            institution: author.institution
                        },
                        create: {
                            name: author.name,
                            email: author.email,
                            institution: author.institution
                        }
                    }))
                }
            },
            include: {
                Authors: true,
            },
        });
        // revalidatePath("/");
        return NextResponse.json({ status: "success", data: updateRegisterConference });

    }catch (e){
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}

// export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
//     const body: RegisterConference = await request.json();
//     const con = await prisma.registerConference.update({
//         where: {
//             id: Number(params.id)
//         },
//         data: {
//             ...body,
//         }
//     });

//     return NextResponse.json(con, {status: 200});
// }

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const con = await prisma.registerConference.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}


export const GET = async (request: Request, {params}: {params: {id: string}}) => {
    const con = await prisma.registerConference.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            Authors: true
        }
    });

    return NextResponse.json(con, {status: 200});
}