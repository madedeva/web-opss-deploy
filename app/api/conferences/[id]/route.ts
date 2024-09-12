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

const generateSlug = (name: string): string => {
    return name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
  }  


export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const formData = await req.formData();
    
        const paper_template = formData.get("paper_template") as File;
        const banner = formData.get("banner") as File;

        if (paper_template){
            const arrayBufferPT = await paper_template.arrayBuffer();
            const bufferPT = new Uint8Array(arrayBufferPT);
            await fs.writeFile(`./public/uploads/paper_template/${paper_template.name}`, bufferPT);
        }

        if (banner){
            const arrayBufferBN = await banner.arrayBuffer();
            const bufferBN = new Uint8Array(arrayBufferBN);
            await fs.writeFile(`./public/uploads/banner/${banner.name}`, bufferBN);
        }
    
        const name = formData.get("name")?.valueOf().toString();
        const slug = name ? generateSlug(name) : '';

        const updatedConference = await prisma.conference.update({
            where: {
                id: Number(params.id)
            },
            data: {
                acronym: formData.get("acronym")?.valueOf().toString() ?? '',
                banner: banner.name,
                address: formData.get("address")?.valueOf().toString() ?? '',
                city: formData.get("city")?.valueOf().toString() ?? '',
                country: formData.get("country")?.valueOf().toString() ?? '',
                description: formData.get("description")?.valueOf().toString() ?? '',
                email: formData.get("email")?.valueOf().toString() ?? '',
                endDate: formData.get("endDate")?.valueOf().toString() ?? '',
                institution: formData.get("institution")?.valueOf().toString() ?? '',
                name: formData.get("name")?.valueOf().toString() ?? '',
                paper_template: paper_template.name,
                payment_info: formData.get("payment_info")?.valueOf().toString() ?? '',
                startDate: formData.get("startDate")?.valueOf().toString() ?? '',
                submission_deadlineEnd: formData.get("submission_deadlineEnd")?.valueOf().toString() ?? '',
                submission_deadlineStart: formData.get("submission_deadlineStart")?.valueOf().toString() ?? '',
                theme: formData.get("theme")?.valueOf().toString() ?? '',
                topic: formData.get("topic")?.valueOf().toString() ?? '',
                venue: formData.get("venue")?.valueOf().toString() ?? '',
                status: formData.get("status")?.valueOf().toString() ?? '',
                slug: slug
            }
        });
        
        revalidatePath("/");
        return NextResponse.json({ status: "success", data: updatedConference });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const con = await prisma.conference.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
    const con = await prisma.conference.findMany({
        where: {
            userId: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}