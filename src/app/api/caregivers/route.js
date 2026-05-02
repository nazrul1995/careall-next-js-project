'use server'

import { ObjectId } from 'mongodb';
import { dbConnect, collections } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const specialties = searchParams.get('specialties'); // comma separated
    const minRate = Number(searchParams.get('minRate')) || 0;
    const maxRate = Number(searchParams.get('maxRate')) || 1000;
    const minExp = Number(searchParams.get('minExp')) || 0;
    const sort = searchParams.get('sort'); // rating | priceLow | priceHigh | experience

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 9;
    const skip = (page - 1) * limit;

    const collection = await dbConnect(collections.CARETAKERS);

    // ================= SINGLE =================
    if (id) {
      if (!ObjectId.isValid(id)) {
        return Response.json({ error: 'Invalid ID' }, { status: 400 });
      }

      const caretaker = await collection.findOne({
        _id: new ObjectId(id),
      });

      return Response.json({ data: caretaker });
    }

    // ================= FILTER QUERY =================
    let query = {
      hourlyRate: { $gte: minRate, $lte: maxRate },
      experience: { $gte: minExp },
    };

    // search by name/location
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    // specialties filter
    if (specialties) {
      const arr = specialties.split(',');
      query.specialties = { $in: arr };
    }

    // ================= SORT =================
    let sortOption = { createdAt: -1 };

    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'priceLow') sortOption = { hourlyRate: 1 };
    if (sort === 'priceHigh') sortOption = { hourlyRate: -1 };
    if (sort === 'experience') sortOption = { experience: -1 };

    // ================= DB QUERY =================
    const caretakers = await collection
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return Response.json({
      data: caretakers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}