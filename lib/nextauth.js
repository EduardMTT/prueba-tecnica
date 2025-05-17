import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { matchPassword } from '@/lib/bcrypt';
import { getServerSession } from 'next-auth';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await db.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) throw new Error('Credenciales incorrectas');

        const isMatch = await matchPassword(
          credentials.password,
          user.password
        );
        if (!isMatch) throw new Error('Credenciales incorrectas');

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
};

export const auth = async () => {
  const session = getServerSession(authOptions);
  return session;
};
