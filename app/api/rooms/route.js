import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function POST(request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'administrador') {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }
    const body = await request.json();
    console.log(body);
  } catch (error) {
    console.error('[ERROR] - ROOMS - POST', error);
    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || 1);
    const pageSize = 10;
    const rooms = await db.room.findMany({
      orderBy: { id: 'asc' },
      include: {
        category: true,
        images: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
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
