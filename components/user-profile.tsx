"use client";

import { Post, Profile } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { formatDistance } from "date-fns";
import { Edit } from "lucide-react";

interface UserProfileProps {
  posts: Post[];
  profile: Profile | null;
  currUser: Profile | null;
}

const UserProfile = ({ posts, profile, currUser }: UserProfileProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto mt-5">
        <div className="flex items-center justify-between">
          <div className="relative w-20 h-20">
            <Image
              src={profile?.imageUrl!}
              className="rounded-full"
              fill
              alt="img"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <p className="font-semibold">{profile?.name}</p>
              <p className="font-semibold text-sm text-gray-600">
                {posts.length} posts
              </p>
            </div>
            {profile?.id === currUser?.id && (
              <p
                className="bg-[#58A6FF] cursor-pointer rounded-lg px-3 py-2"
                onClick={() => router.push(`/user-profile/${profile?.id}/edit`)}
              >
                Edit profile
              </p>
            )}
          </div>
        </div>
        <p className="text-sm ml-auto pt-6">{profile?.bio}</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <hr className="border-gray-700 mt-5" />
        {posts.length > 0 && (
          <h2 className="font-semibold text-[#58A6FF] text-xl pt-4">Posts</h2>
        )}
        {posts.length > 0 &&
          posts.map((post) => (
            <Card
              key={post.id}
              className="w-full border-gray-700 mt-5 shadow-lg"
            >
              <CardHeader className="flex items-center space-x-5">
                <div className="relative h-8 w-8">
                  <Image
                    src={profile?.imageUrl!}
                    alt="post_image"
                    className="rounded-full"
                    fill
                  />
                </div>
                <span className="font-semibold">
                  {profile?.id === currUser?.id ? "You" : profile?.name}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatDistance(new Date(), new Date(post.createdAt))} ago
                </span>
                {profile?.id === currUser?.id && (
                  <span
                    className="cursor-pointer text-right"
                    onClick={() => router.push(`/post/${post.id}`)}
                  >
                    <Edit className="w-4 h-4 text-gray-600 hover:text-gray-300" />
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <div className="relative lg:w-[450px] md:w-[400px] h-[400px] mx-auto">
                  <Image
                    src={post?.imageUrl}
                    fill
                    className="rounded-md"
                    alt="post"
                  />
                </div>
                <p className="text-sm pt-5">{post?.caption}</p>
              </CardContent>
            </Card>
          ))}

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-lg font-semibold">No posts yet.</p>
            {profile?.id === currUser?.id && (
              <p className="text-sm text-gray-500 mt-2 cursor-pointer hover:text-gray-400" onClick={() => router.push('/post/create')}>
                Create your first post.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
