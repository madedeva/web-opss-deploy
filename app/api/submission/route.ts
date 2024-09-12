import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {RegisterConference} from "@prisma/client";
import formidable from 'formidable';
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from 'path';

// export const config = {
//     api: {
//       bodyParser: false,
//     },
// };

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try{
        const formData = await request.formData();

        console.log(formData)

        const paper = formData.get("paper") as File;
        if (paper){
            const arrayBufferPaper = await paper.arrayBuffer();
            const bufferPaper = new Uint8Array(arrayBufferPaper);
            await fs.writeFile(`./public/uploads/papers/${paper.name}`, bufferPaper);
        }

        const Authors = JSON.parse(formData.get("Authors")?.toString() ?? '[]');

        const con = await prisma.registerConference.create({
            data: {
                paper_title: formData.get("paper_title")?.valueOf().toString() ?? '',
                institution: formData.get("institution")?.valueOf().toString() ?? '',
                topic: formData.get("topic")?.valueOf().toString() ?? '',
                abstract: formData.get("abstract")?.valueOf().toString() ?? '',
                keywords: formData.get("keywords")?.valueOf().toString() ?? '',
                country: formData.get("country")?.valueOf().toString() ?? '',
                city: formData.get("city")?.valueOf().toString() ?? '',
                status: 'Submitted',
                paper: paper.name,
                userId: parseInt(formData.get("userId")?.valueOf().toString() ?? '0'),
                conferenceId: parseInt(formData.get("conferenceId")?.valueOf().toString() ?? '0'),
                Authors: {
                    create: Authors.map((author: any) => ({
                        name: author.name,
                        email: author.email,
                        institution: author.institution
                    }))
                }
            },
            include: {
                Authors: true,
            },
        });
        revalidatePath("/");
        return NextResponse.json({ status: "success" });

    } catch (e){
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}