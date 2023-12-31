import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const { caption, imageUrl, c_lat, c_long } = await req.json();
    const profile = await currentProfile();

    if (!caption || !imageUrl || !c_lat || !c_long || !params.postId) {
      return new NextResponse("Parameters are missing.", { status: 400 });
    }

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        caption,
        c_lat,
        c_long,
        imageUrl,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("[POST_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const post = await db.post.delete({
      where:{
        id: params.postId
      }
    });
    return NextResponse.json(post, { status: 200})
  } catch (error) {
    console.log("[POST_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
