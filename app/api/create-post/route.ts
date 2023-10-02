import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { caption, imageUrl, c_lat, c_long } = await req.json();
    const profile = await currentProfile();

    if (!caption || !imageUrl || !c_lat || !c_long) {
      return new NextResponse("Parameters are missing.", { status: 400 });
    }

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.create({
      data: {
        caption,
        c_lat,
        c_long,
        imageUrl,
        profileId: profile.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("[CREATEPOST_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
