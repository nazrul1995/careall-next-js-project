import bcrypt from 'bcryptjs';
import { dbConnect, collections } from '@/lib/dbConnect';

export async function POST(request) {
  console.log(request)
  try {    const body = await request.json();

    const {
      email,
      password,
      name,
      role,
      photo,
      location,
      experience,
      hourlyRate,
      credentials,
      description,
      specialties,
    } = body;
console.log(body)
    // ================= VALIDATION =================
    if (!email || !password || !name || !role) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // ================= CHECK EXISTING USER =================
    const usersCollection = await dbConnect(collections.users);

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // ================= HASH PASSWORD =================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ================= USER OBJECT =================
    const user = {
      email,
      password: hashedPassword,
      name,
      role,
      photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userResult = await usersCollection.insertOne(user);

    // ================= CAREGIVER EXTRA DATA =================
    if (role === 'Caregiver') {
      const caregiverCollection = await dbConnect(collections.CARETAKERS);

      const caregiverProfile = {
        userId: userResult.insertedId,
        name,
        email,
        photo,
        location,
        experience: Number(experience),
        hourlyRate: Number(hourlyRate),
        credentials,
        description,
        specialties: specialties || [],
        rating: 0,
        jobs: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await caregiverCollection.insertOne(caregiverProfile);
    }

    // ================= RESPONSE =================
    return Response.json(
      {
        message: 'User registered successfully',
        userId: userResult.insertedId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register error:', error);

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}