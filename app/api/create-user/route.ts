import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { username, bio, imageUrl } = await req.json();

    const currUser = await currentUser();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });
    if (!username)
      return new NextResponse("Username is required", { status: 400 });
    if (!bio) return new NextResponse("Bio is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image is required", { status: 400 });

    const user = await db.profile.create({
      data: {
        userId:currUser.id,
        name: username,
        bio,
        imageUrl,
        email: currUser.emailAddresses[0].emailAddress,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[CREATEUSER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
