import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function DELETE(request, { params }) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'administrador') {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: 'Id inválido' },
        {
          status: 400,
        }
      );
    }
    const roomElimated = await db.room.delete({
      where: { id: Number(id) },
      include: { images: true },
    });
    return NextResponse.json(
      { message: 'Habitacion eliminada', data: roomElimated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - HABITACION - DELETE', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

const updateRoomSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  capacity: z.number().min(1, 'La capacidad debe ser mayor a 0'),
  cost: z.number().min(0, 'El costo no puede ser negativo'),
});

export async function PUT(request, { params }) {
  try {
    // const session = await auth();
    // if (!session || session.user.role !== 'administrador') {
    //   return NextResponse.json(
    //     { message: 'No tienes permiso para esta operación' },
    //     { status: 401 }
    //   );
    // }
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

    const findRoom = await db.room.findFirst({
      where: { id: Number(id) },
    });

    if (!findRoom) {
      return NextResponse.json(
        { messagge: 'Habitacion no encontrada' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const { data: room, success, error } = updateRoomSchema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.flatten() },
        { status: 400 }
      );
    }

    const roomUpdated = await db.room.update({
      where: { id: Number(id) },
      data: room,
    });

    return NextResponse.json(
      { message: 'Habitacion actualizada', data: roomUpdated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - Habitacion - UPDATE', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
