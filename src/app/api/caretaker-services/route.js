import { getCaretakers, postServices } from "@/actions/server/caretakers";
import { collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filters = {};
  const options = {};

  // extract known params
  for (const [key, value] of searchParams.entries()) {
    if (key === 'page' || key === 'limit') {
      options[key] = Number(value);
    } else if (key === 'service') {
      // may appear multiple times
      if (filters.service) {
        filters.service = Array.isArray(filters.service)
          ? [...filters.service, value]
          : [filters.service, value];
      } else {
        filters.service = value;
      }
    } else {
      filters[key] = value;
    }
  }

  const { results, total } = await getCaretakers(filters, options);
  return Response.json({ caretakers: results, total });
}

export async function POST(request) {
  const data = await request.json();
  const result = await postServices(data);
  return Response.json(result);
}

