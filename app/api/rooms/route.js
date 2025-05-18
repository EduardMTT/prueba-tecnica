import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || 1);
    const categoryId = parseInt(searchParams.get('categoryId') || null);
    const pageSize = 10;

    const rooms = await db.room.findMany({
      orderBy: { id: 'asc' },
      include: {
        category: true,
        images: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        ...(categoryId ? { categoryId: { equals: Number(categoryId) } } : {}),
      },
    });
    const total = await db.room.count();

    const paginas = Math.ceil(total / pageSize);

    return NextResponse.json({ rooms, paginas }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] - ROOMS - GET', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

const createRoomSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  capacity: z.number().min(1, 'La capacidad debe ser mayor a 0'),
  cost: z.number().min(0, 'El costo no puede ser negativo'),
  categoryId: z.number(),
});

export async function POST(request) {
  try {
    //#region Autentificacion
    const session = await auth();
    if (!session || session.user.role !== 'administrador') {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }
    //#endregion

    const body = await request.json();
    const { data: room, success, error } = createRoomSchema.safeParse(body);

    if (!success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    console.log(JSON.stringify(room));

    const roomCreated = await db.room.create({ data: room });

    return NextResponse.json(roomCreated, { status: 201 });
  } catch (error) {
    console.error('[ERROR] - ROOM - POST', error);

    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
