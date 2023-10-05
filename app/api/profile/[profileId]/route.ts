import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { username, bio, imageUrl, c_lat, c_long } = await req.json();
    const profile = await currentProfile();

    if (!username || !bio || !imageUrl || !c_lat || !c_long)
      return new NextResponse("Parameters are missing.", { status: 400 });

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const post = await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        name:username,
        bio,
        imageUrl,
        c_lat,
        c_long,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
