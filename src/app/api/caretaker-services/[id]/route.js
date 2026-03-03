import { getSingleCaretaker } from "@/actions/server/caretakers";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = await params;
  const data = await getSingleCaretaker(id);
  return Response.json(data);
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const data = await request.json();

  if (!id || id.length !== 24) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const collection = await dbConnect(collections.CARETAKERS);

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );

  return Response.json(result);
}


export async function DELETE(request, { params }) {
  const { id } = await params; // ✅ unwrap params (Next.js 15+)

  // Validate ObjectId safely
  if (!id || !ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const collection = await dbConnect(collections.CARETAKERS);

  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });

  // If nothing was deleted
  if (result.deletedCount === 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}