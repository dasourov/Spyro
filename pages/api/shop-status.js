import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("coffee_shop");
  const collection = db.collection("shopStatus");

  if (req.method === "GET") {
    // Try to get current status from DB
    let statusDoc = await collection.findOne({ name: "mainShop" });

    if (!statusDoc) {
      // If not existing, create with default true
      await collection.insertOne({ name: "mainShop", isOpen: true });
      statusDoc = { isOpen: true };
    }

    return res.status(200).json({ isOpen: statusDoc.isOpen });
  }

  if (req.method === "POST") {
    const { password, newStatus } = req.body;

    if (password !== "spyro2025") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await collection.updateOne(
      { name: "mainShop" },
      { $set: { isOpen: newStatus } },
      { upsert: true }
    );

    return res.status(200).json({ isOpen: newStatus });
  }

  res.status(405).json({ error: "Method not allowed" });
}
