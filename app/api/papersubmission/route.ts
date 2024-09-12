import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Explicitly mark the route as dynamic to avoid static rendering issues
export const dynamic = 'force-dynamic';

// Define the GET request handler
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');
    
    if (!userIdParam) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    const userId = Number(userIdParam);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    const papers = await prisma.registerConference.findMany({
      where: {
        conference: {
          userId: userId,
        },
      },
      include: {
        conference: {
          include: {
            User: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(papers);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ status: 'fail', error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error', error);
      return NextResponse.json({ status: 'fail', error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
