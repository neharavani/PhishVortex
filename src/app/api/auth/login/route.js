import { connectToDatabase } from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    console.log("Login request for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    console.log("Token generated:", token);

    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Login failed", error: err.message }, { status: 500 });
  }
}
