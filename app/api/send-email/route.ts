import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { userId, subject, messageTemplate } = await request.json();

    console.log(userId)

    if (!userId || !Array.isArray(userId) || userId.length === 0) {
      return NextResponse.json({ error: 'User IDs tidak valid' }, { status: 400 });
    }

    if (!subject || !messageTemplate) {
      return NextResponse.json({ error: 'Subject dan message diperlukan' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { id: { in: userId } },
    });

    if (users.length === 0) {
      return NextResponse.json({ error: 'Tidak ada pengguna ditemukan' }, { status: 404 });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'deva.kerti@undiksha.ac.id',
            pass: 'zntegtyxgvnqojbn'
        }
    });

    const emailPromises = users.map(user => {
      const message = messageTemplate.replace(/<name>/g, user.name);
      return transporter.sendMail({
        from: 'deva.kerti@undiksha.ac.id',
        to: user.email,
        subject,
        text: message,
      });
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ message: 'Email berhasil dikirim' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Gagal mengirim email' }, { status: 500 });
  }
}
