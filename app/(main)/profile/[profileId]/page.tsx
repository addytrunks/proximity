import ProfileForm from "@/components/profile-form";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface EditProfilePageProps {
  params: {
    profileId: string;
  };
}

const EditProfilePage = async ({ params }: EditProfilePageProps) => {
  const profile = await db.profile.findFirst({
    where: {
      id: params.profileId,
    },
  });
  const currUser = auth();
  if (currUser.userId !== profile?.userId) return redirect("/");

  return (
    <div>
      <ProfileForm profile={profile}/>
    </div>
  );
};

export default EditProfilePage;
