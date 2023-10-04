import PostForm from "@/components/post-form";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

interface EditPageProps {
  params: {
    postId: string;
  };
}

const EditPage = async ({ params }: EditPageProps) => {

  const profile = await currentProfile();
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
  });

  if(post?.profileId !== profile?.id) return redirect('/')

  return (
    <div>
      <PostForm type="edit" data={post} />
    </div>
  );
};

export default EditPage;
