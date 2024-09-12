import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const roles = await prisma.role.findMany();
    return NextResponse.json(roles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};