import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect, collections } from '@/lib/dbConnect';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const usersCollection = await dbConnect(collections.users);
          const user = await usersCollection.findOne({ email: credentials.email });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image || null,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, email, profile }) {
      // Handle Google OAuth sign-in
      if (account?.provider === 'google') {
        try {
          const usersCollection = await dbConnect(collections.users);
          
          // Check if user already exists
          let existingUser = await usersCollection.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user from Google profile
            const result = await usersCollection.insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              googleId: user.id,
              role: 'Client', // Default role for Google sign-ups
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            existingUser = { _id: result.insertedId };
          }
          
          // Update user document with Google ID and image if not already set
          if (!existingUser.googleId) {
            await usersCollection.updateOne(
              { _id: existingUser._id },
              {
                $set: {
                  googleId: user.id,
                  image: user.image,
                  updatedAt: new Date(),
                },
              }
            );
          }
          
          // Attach MongoDB id to user object for JWT
          user.id = existingUser._id.toString();
          user.role = existingUser.role || 'Client';
          
          return true;
        } catch (error) {
          console.error('Google sign-in error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'Client';
        token.provider = account?.provider;
        token.image = user.image || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
