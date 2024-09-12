import { NextResponse } from 'next/server';
import { sendResetPasswordEmail } from '@/lib/mail';
import { findUserByEmail, createPasswordResetToken } from '@/lib/user';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ message: 'No user found with this email address' }, { status: 404 });
    }

    const token = await createPasswordResetToken(user.id.toString());
    await sendResetPasswordEmail(email, token);

    return NextResponse.json({ status:true, message: 'Password reset link has been sent to your email' }, { status: 200 });
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    return NextResponse.json({ status:false, message: 'Internal server error' }, { status: 500 });
  }
}
