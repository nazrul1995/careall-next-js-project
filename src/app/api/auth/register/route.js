import bcrypt from 'bcryptjs';
import { dbConnect, collections } from '@/lib/dbConnect';

export async function POST(request) {
  try {
    const { email, password, name, role } = await request.json();

    // validation
    if (!email || !password || !name || !role) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters' }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400 }
      );
    }

    // check if user already exists
    const usersCollection = await dbConnect(collections.users);
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 409 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user document
    const user = {
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // insert into database
    const result = await usersCollection.insertOne(user);

    return new Response(
      JSON.stringify({
        message: 'User registered successfully',
        userId: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
