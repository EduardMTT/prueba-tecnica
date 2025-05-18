import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import dayjs from 'dayjs';
import { auth } from '@/lib/nextauth';
import { User } from 'lucide-react';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operacion' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || 1);
    const status = parseInt(searchParams.get('status') || 1);

    const pageSize = 10;
    const reservations = await db.reservation.findMany({
      orderBy: { id: 'asc' },
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        details_reservation: {
          include: {
            room: true,
          },
        },
        user: true,
      },
      where: {
        ...(status ? { Status: { equals: status } } : {}),
        ...(session.user.role === 'cliente'
          ? { userID: parseInt(session.user.id) }
          : {}),
      },
    });
    const total = await db.reservation.count();

    const pages = Math.ceil(total / pageSize);

    return NextResponse.json({ reservations, pages }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] - RESERVATIONS - GET', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

const createReservationSchema = z.object({
  request_date: z
    .string()
    .refine((dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(), {
      message: 'Formato de fecha ISO 8601 inválido',
    }),
  reservation_date: z
    .string()
    .refine((dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(), {
      message: 'Formato de fecha ISO 8601 inválido',
    }),
  departure_date: z
    .string()
    .refine((dateString) => dayjs(dateString, dayjs.ISO_8601, true).isValid(), {
      message: 'Formato de fecha ISO 8601 inválido',
    }),
  Status: z.enum(['pending', 'accepted', 'rejected', 'canceled']).optional(),
});

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operacion' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      data: reservation,
      success,
      error,
    } = createReservationSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(error.flatten(), { status: 400 });
    }
    console.log(session.user.id);
    const reservationCreated = await db.reservation.create({
      data: { ...reservation, userID: session.user.id },
    });

    return NextResponse.json(reservationCreated);
  } catch (error) {
    console.error('[ERROR] - RESERVATIONS - POST', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}
