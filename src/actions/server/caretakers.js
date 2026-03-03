'use server'

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";


export async function getCaretakers(filters = {}, options = {}) {
  const collection = await dbConnect(collections.CARETAKERS);

  const query = {};

  // Search text (look in name or description)
  if (filters.search && filters.search.trim() !== '') {
    const term = filters.search.trim();
    query.$or = [
      { name: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
    ];
  }

  // Service Type (single value or array)
  if (filters.service) {
    if (Array.isArray(filters.service)) {
      query.specialties = { $in: filters.service };
    } else {
      query.specialties = filters.service;
    }
  }

  // Experience (allow 0 but ignore empty string / undefined)
  if (filters.minExp !== undefined && filters.minExp !== '') {
    query.experience = { $gte: Number(filters.minExp) };
  }

  // Hourly Rate
  if (
    (filters.minRate !== undefined && filters.minRate !== '') ||
    (filters.maxRate !== undefined && filters.maxRate !== '')
  ) {
    query.hourlyRate = {};
    if (filters.minRate !== undefined && filters.minRate !== '') {
      query.hourlyRate.$gte = Number(filters.minRate);
    }
    if (filters.maxRate !== undefined && filters.maxRate !== '') {
      query.hourlyRate.$lte = Number(filters.maxRate);
    }
  }

  // pagination options: page and limit
  const page = options.page && options.page > 0 ? Number(options.page) : null;
  const limit = options.limit && options.limit > 0 ? Number(options.limit) : null;

let cursor = collection.find(query);

  // apply sorting if requested
  if (filters.sort) {
    switch (filters.sort) {
      case 'ratingDesc':
        cursor = cursor.sort({ rating: -1 });
        break;
      case 'priceAsc':
        cursor = cursor.sort({ hourlyRate: 1 });
        break;
      case 'priceDesc':
        cursor = cursor.sort({ hourlyRate: -1 });
        break;
      case 'experienceDesc':
        cursor = cursor.sort({ experience: -1 });
        break;
      default:
        // no-op for unrecognized values
        break;
    }
  }

  const total = await collection.countDocuments(query);

  let results;
  if (page && limit) {
    const skip = (page - 1) * limit;
    results = await cursor.skip(skip).limit(limit).toArray();
  } else {
    results = await cursor.toArray();
  }

  return { results, total };
}

export const postServices = async (data) => {
  const collection = await dbConnect(collections.CARETAKERS);
  const result = await collection.insertOne(data);
  return result;
};


export const getSingleCaretaker = async (id) => {
  if (!id || id.length !== 24) {
    return {};
  }

  const collection = await dbConnect(collections.CARETAKERS);

  const singleCaretaker = await collection.findOne({
    _id: new ObjectId(id),
  });

  if (!singleCaretaker) {
    return {};
  }

  return {
    ...singleCaretaker,
    _id: singleCaretaker._id.toString(),
  };
};