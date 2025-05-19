# Gestor para Hotel (Next.js + Prisma)

Este es un proyecto desarrollado con [Next.js](https://nextjs.org) y Prisma, creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Requisitos del Sistema

Para ejecutar esta aplicación, asegúrate de que tu sistema cumpla con los siguientes requisitos:

* **Node.js:** Se requiere una versión igual o superior a la 18.x. Puedes descargar la última versión LTS o la versión actual desde el sitio web oficial de [Node.js](https://nodejs.org/).

    Para verificar tu versión de Node.js, abre tu terminal o símbolo del sistema y ejecuta el siguiente comando:

    ```bash
    node -v
    ```

* **PostgreSQL:** Necesitas tener instalado y configurado un servidor de base de datos PostgreSQL. Puedes obtener instrucciones de instalación para tu sistema operativo en la [documentación oficial de PostgreSQL](https://www.postgresql.org/download/).

    Asegúrate de tener las credenciales (nombre de usuario, contraseña, nombre de la base de datos, host y puerto) necesarias para conectar la aplicación a la base de datos.



Asegurarte de cumplir con estos requisitos garantizará que la aplicación pueda ejecutarse correctamente en tu entorno.

## Primeros pasos

Instala las dependencias:

```bash
npm install
# o
yarn install
```

Crea tu archivo .env :

.example.env
```bash
# Base de datos
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Datos del primer usuario (para seeding)
FIRST_USER_NOMBRE=""
FIRST_USER_APELLIDO=""
FIRST_USER_TELEFONO=""
FIRST_USER_CORREO=""
FIRST_USER_ROL=""
FIRST_USER_USUARIO=""
FIRST_USER_CLAVE=""

# NextAuth
NEXTAUTH_URL="http://localhost:3000" #no modifiques este dato a menos que lo requieras
NEXTAUTH_SECRET="your-secret-key"
```

Si no cuentas con secret-key para NEXTAUTH creala (requiere Node.js):
```bash
openssl rand -base64 32
# o
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Despues de definir correctamente tus variables de entorno ejecuta las migraciones:
```bash
npx prisma migrate dev
```
Finalmente, si el seed no se ejecuta automáticamente,
puedes insertarlo manualmente para cargar los primeros registros (como el usuario administrador inicial) con el siguiente comando:

```bash
npx prisma db seed
```

## Ejecucion
Puedes iniciar el proyecto con el comando:

```bash
npm run dev
```

