import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('reservationId');

    const whereClause = reservationId
      ? { reservationId: parseInt(reservationId) }
      : {};

    const details = await db.detailsReservation.findMany({
      where: whereClause,
      include: {
        room: true,
      },
    });

    return NextResponse.json(details, { status: 200 });
  } catch (error) {
    console.error('[ERROR] - DETAILS-RESERVATION - GET', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

const createDetailReservationSchema = z.object({
  reservationId: z.number(),
  roomId: z.number(),
});

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = createDetailReservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    const created = await db.detailsReservation.create({
      data: parsed.data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('[ERROR] - DETAILS-RESERVATION - POST', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
