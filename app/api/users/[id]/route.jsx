import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function DELETE(request, { params }) {
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

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: 'Id inválido' },
        {
          status: 400,
        }
      );
    }
    const userEliminated = await db.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: 'Usuario eliminado', data: userEliminated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - USER - DELETE', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

export const updateUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no debe tener más de 15 dígitos'),
  role: z.enum(['administrador', 'cliente']).optional(),
});

export async function PUT(request, { params }) {
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

    const findUser = await db.user.findFirst({
      where: { id: Number(id) },
    });

    if (!findUser) {
      return NextResponse.json(
        { messagge: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const { data: user, success, error } = updateUserSchema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.flatten() },
        { status: 400 }
      );
    }

    const userUpdated = await db.user.update({
      where: { id: Number(id) },
      data: user,
    });

    return NextResponse.json(
      { message: 'Usuario actualizado', data: userUpdated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - USER - UPDATE', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
