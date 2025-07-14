import { connectToDatabase } from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required." }), { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists." }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword });
  await user.save();

  return new Response(JSON.stringify({ message: "User created successfully." }), { status: 201 });
}
