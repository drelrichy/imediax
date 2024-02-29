import { connectToDB } from "@lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {


  

  try {
   var  { firstname, lastname, username, image, role, email, password } = await req.json();
    if(!username)username= email;
    if(!image)image="";
    if(!role)role ='user';


   
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDB();

    console.log({ firstname, lastname, username, role, image, email, password: hashedPassword });

    await User.create({ firstname, lastname, username, role, image, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {

    console.log(error);
    return NextResponse.json(
      { message: "API :: An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
