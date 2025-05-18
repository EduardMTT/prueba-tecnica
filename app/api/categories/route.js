import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || 1);
    const pageSize = 10;
    const categories = await db.category.findMany({
      orderBy: { id: 'asc' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    const total = await db.category.count();

    const pages = Math.ceil(total / pageSize);

    return NextResponse.json({ categories, pages }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] - CATEGORIES - GET', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

const createCategorySchema = z.object({
  name: z.string().min(4, 'El nombre es requerido'),
  description: z
    .string()
    .min(10, 'Minimo 10 caracteres')
    .max(50, 'Maximo 50 caracteres'),
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
    const {
      data: category,
      success,
      error,
    } = createCategorySchema.safeParse(body);

    if (!success) {
      return NextResponse.json(error.flatten(), { status: 400 });
    }

    const categoryCreated = await db.category.create({ data: category });
    return NextResponse.json(categoryCreated);
  } catch (error) {
    console.error('[ERROR] - CATEGORIES - GET', error);
    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}
