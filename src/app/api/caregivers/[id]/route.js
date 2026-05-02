import { ObjectId } from 'mongodb';
import { dbConnect, collections } from '@/lib/dbConnect';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: 'Invalid caretaker ID' },
        { status: 400 }
      );
    }

    const collection = await dbConnect(collections.CARETAKERS);

    const caretaker = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!caretaker) {
      return Response.json(
        { error: 'Caretaker not found' },
        { status: 404 }
      );
    }

    return Response.json({ data: caretaker }, { status: 200 });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}