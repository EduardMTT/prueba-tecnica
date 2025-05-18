import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import dayjs from 'dayjs';
import { auth } from '@/lib/nextauth';

export async function DELETE(request, { params }) {
  try {
    //#region Autentificacion
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }
    //#endregion

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: 'Id inválido' },
        {
          status: 400,
        }
      );
    }
    const reservationDeleted = await db.reservation.delete({
      where: { id: Number(id) },
      include: { details_reservation: true },
    });
    return NextResponse.json(
      { message: 'Reservacion eliminada', data: reservationDeleted },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - RESERVATION - DELETE', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

const updateReservationSchema = z.object({
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

export async function PUT(request, { params }) {
  try {
    //#region Autentificacion
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }
    //#endregion
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { message: 'Id no encontrado' },
        {
          status: 400,
        }
      );
    }

    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Id inválido' },
        {
          status: 404,
        }
      );
    }

    const findReservation = await db.reservation.findFirst({
      where: { id: Number(id) },
    });

    if (!findReservation) {
      return NextResponse.json(
        { messagge: 'Habitacion no encontrada' },
        { status: 404 }
      );
    }
    const body = await request.json();

    const {
      data: reservation,
      success,
      error,
    } = updateReservationSchema.safeParse(body);
    console.log(reservation.Status);

    const clientoperations = ['canceled', 'pending'];
    if (!clientoperations.includes(reservation.Status)) {
      //#region Autentificacion
      if (session.user.role !== 'administrador') {
        return NextResponse.json(
          { message: 'No tienes permiso para esta operación' },
          { status: 401 }
        );
      }
      //#endregion
    }

    if (!success) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.flatten() },
        { status: 400 }
      );
    }

    const reservationUpdated = await db.reservation.update({
      where: { id: Number(id) },
      data: reservation,
    });

    return NextResponse.json(
      { message: 'Reservacion actualizada', data: reservationUpdated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - RESERVATION - UPDATE', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
