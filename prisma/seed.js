import { db } from '../lib/db.js';
import { encryptPassword } from '../lib/bcrypt.js';

const main = async () => {
  const usersCount = await db.user.count();

  if (usersCount === 0) {
    await db.user.create({
      data: {
        name: process.env.FIRST_USER_NOMBRE,
        lastName: process.env.FIRST_USER_APELLIDO,
        email: process.env.FIRST_USER_CORREO,
        phone: process.env.FIRST_USER_TELEFONO,
        role: process.env.FIRST_USER_ROL,
        password: await encryptPassword(process.env.FIRST_USER_CLAVE),
      },
    });

    console.log('Usuario administrador creado correctamente.');
  } else {
    console.log('Ya existen usuarios en la base de datos.');
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
