import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

type PasswordNew = {
    id: number;
    name: string;
    email: string;
    password: string; // current password
    passwordNew: string;
    passwordConfirm: string;
};

export const PATCH = async (request: Request) => {
    try {
        const body: PasswordNew = await request.json();

        // Validate current password
        const currentUser = await prisma.user.findUnique({
            where: { id: body.id },
        });

        if (!currentUser) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(body.password, currentUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
        }

        // Validate new password and confirmation
        if (body.passwordNew !== body.passwordConfirm) {
            return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
        }

        // Validate email format
        if (!body.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(body.email)) {
            return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
        }

        // Encrypt new password
        const hashedPassword = await bcrypt.hash(body.passwordNew, 10);

        const user = await prisma.user.update({
            where: {
                id: body.id,
            },
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                name: user.name,
                email: user.email,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
