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

    const categoryEliminated = await db.category.delete({
      where: { id: Number(id) },
      include: { rooms: { include: { images: true } } },
    });

    return NextResponse.json(
      { message: 'Categoría eliminada', data: categoryEliminated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - CATEGORIA - DELETE', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

const updateCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').optional(),
  description: z.string().min(1, 'La descripción es requerdia').optional(),
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

    const findCategory = await db.category.findFirst({
      where: { id: Number(id) },
    });

    if (!findCategory) {
      return NextResponse.json(
        { messagge: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const {
      data: category,
      success,
      error,
    } = updateCategorySchema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error.flatten() },
        { status: 400 }
      );
    }

    const categoriaUpdated = await db.category.update({
      where: { id: Number(id) },
      data: category,
    });

    return NextResponse.json(
      { message: 'Categoría actualizada', data: categoriaUpdated },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] - CATEGORIA - UPDATE', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
