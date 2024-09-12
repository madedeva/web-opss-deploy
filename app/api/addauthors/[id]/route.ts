import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Authors } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const PUT = async (request: Request) => {
    try {
        const body: Partial<Authors> & { id: number } = await request.json();
        
        console.log("Received data:", body);

        const author = await prisma.authors.update({
            where: { id: body.id },
            data: {
                name: body.name,
                email: body.email,
                institution: body.institution,
            },
        });

        return NextResponse.json(author, { status: 200 });
    } catch (error) {
        console.error("Error updating author:", error);
        return NextResponse.json({ error: "Failed to update author" }, { status: 500 });
    }
};


export const DELETE = async (request: Request) => {
    try {
        const { id } = await request.json();
        
        console.log("Received ID:", id);

        const author = await prisma.authors.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Author deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting author:", error);
        return NextResponse.json({ error: "Failed to delete author" }, { status: 500 });
    }
};