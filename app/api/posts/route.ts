import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { postWithProfile } from "@/types.t";
import { NextResponse } from "next/server";

const MAX_POSTS = 2;

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

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    let posts:postWithProfile[] = [];

    if(cursor){
      posts = await db.post.findMany({
        take:MAX_POSTS,
        skip:1,
        cursor:{
          id:cursor
        },
        include:{
          Profile:true
        },
        orderBy:{
          createdAt:'desc'
        }
      })
    }else{
      posts = await db.post.findMany({
        take:MAX_POSTS,
        include:{
          Profile:true
        },
        orderBy:{
          createdAt:'desc'
        }
      })
    }
    let nextCursor = null;

    if(posts.length === MAX_POSTS){
      nextCursor = posts[MAX_POSTS-1].id;
    }
    return NextResponse.json({posts,nextCursor}, { status: 200 });
  } catch (error) {
    console.log("POSTS_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
