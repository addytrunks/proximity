"use client";

import { Post, Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { formatDistance } from "date-fns";
import { calculateRadius } from "@/lib/utils";

interface FeedProps {
  postsWithProfile: (Post & {
    Profile: Profile;
  })[];
  userProfile: Profile;
}

const Feed = ({ postsWithProfile,userProfile }: FeedProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      {postsWithProfile.map((post) => (
        <Card className="lg:w-[600px] md:w-[550px] border-gray-700 mt-5 shadow-lg">
          <CardHeader className="flex items-center space-x-5">
            
            <div className="relative h-8 w-8">
              <Image
                src={post.Profile.imageUrl}
                alt="post_image"
                className="rounded-full"
                fill
              />
            </div>
            <span className="font-semibold">
              {post.Profile.name.toLowerCase()}
            </span>
            <span className="text-gray-500 text-xs">
              {formatDistance(new Date(), post.createdAt)} ago
            </span>
            <span className="text-gray-500 text-xs text-right">{calculateRadius(userProfile.c_lat,userProfile.c_long,post.c_lat,post.c_long)} KM away from you.</span>
          </CardHeader>
          <CardContent>
            <div className="relative lg:w-[500px] md:w-[400px] h-[400px] md mx-auto">
              <Image
                src={post.imageUrl}
                fill
                className="rounded-md"
                alt="post"
              />
            </div>
            <p className="text-sm pt-5">{post.caption}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
