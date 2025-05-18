import { encryptPassword } from '@/lib/bcrypt';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/nextauth';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'administrador') {
      return NextResponse.json(
        { message: 'No tienes permiso para esta operación' },
        { status: 401 }
      );
    }
    const users = await db.user.findMany({
      omit: { password: true },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] - USUARIOS - GET', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}

export const createUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no debe tener más de 15 dígitos'),
  role: z.enum(['administrador', 'cliente']).optional(),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña no debe superar los 50 caracteres'),
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const { data: user, success, error } = createUserSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(error.flatten(), { status: 400 });
    }
    if (!user.password) {
      return new Response(JSON.stringify({ error: 'Falta la contraseña' }), {
        status: 400,
      });
    }

    const hashedPassword = await encryptPassword(user.password);

    user.password = hashedPassword;

    const userCreated = await db.user.create({ data: user });

    return NextResponse.json(userCreated);
  } catch (error) {
    console.error('[ERROR] - USUARIOS - POST', error);

    return NextResponse.json(
      { message: 'Intenal server error' },
      { status: 500 }
    );
  }
}
