import { db } from '../lib/db.js';
import { encryptPassword } from '../lib/bcrypt.js';

const main = async () => {
  const usersCount = await db.user.count();
  const categoryCount = await db.category.count();
  const roomCount = await db.room.count();

  // Crear usuario administrador
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

  // Crear categorías
  if (categoryCount === 0) {
    await db.category.createMany({
      data: [
        {
          name: 'Estándar',
          description:
            'Habitación cómoda con lo esencial para una estancia placentera.',
        },
        {
          name: 'Doble',
          description:
            'Habitación con dos camas individuales o una cama doble para compartir.',
        },
        {
          name: 'Suite',
          description:
            'Espaciosa y elegante, con zona de estar y servicios premium.',
        },
        {
          name: 'Deluxe',
          description:
            'Habitación de lujo con vistas, mobiliario superior y comodidades mejoradas.',
        },
        {
          name: 'Familiar',
          description:
            'Ideal para familias, con múltiples camas y espacio adicional.',
        },
        {
          name: 'Ejecutiva',
          description:
            'Diseñada para viajeros de negocios, incluye escritorio y servicios especiales.',
        },
        {
          name: 'Penthouse',
          description:
            'La mejor habitación del hotel, con terraza privada y vista panorámica.',
        },
      ],
    });

    console.log('Categorías creadas correctamente.');
  } else {
    console.log('Ya existen categorías en la base de datos.');
  }

  // Crear habitaciones
  if (roomCount === 0) {
    const categories = await db.category.findMany();

    const roomsData = categories.map((cat, index) => ({
      name: `Habitación ${cat.name}`,
      capacity: 2 + (index % 4),
      description: `Una hermosa habitación tipo ${cat.name.toLowerCase()}.`,
      cost: (80 + index * 20).toFixed(2),
      categoryId: cat.id,
    }));

    await db.room.createMany({
      data: roomsData,
    });

    console.log('Habitaciones creadas correctamente.');
  } else {
    console.log('Ya existen habitaciones en la base de datos.');
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
