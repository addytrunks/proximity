import UserProfile from "@/components/user-profile";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import React from "react";

interface UserProfileProps {
  params: {
    profileId: string;
  };
}

const UserProfilePage = async ({ params }: UserProfileProps) => {
  const profile = await db.profile.findFirst({
    where: {
      id: params.profileId,
    },
  });
  const posts = await db.post.findMany({
    where: {
      profileId: params.profileId,
    },
  })

  const currUser = await currentProfile();

  return (
    <div className="h-full p-4">
        <h2 className="font-semibold text-3xl">
          {profile?.id === currUser?.id ? 'Your' : 'User'} <span className="text-[#58A6FF]">Profile</span>
        </h2>
      <UserProfile posts={posts} profile={profile} currUser={currUser}/>
    </div>
  );
};

export default UserProfilePage;
