import PostForm from "@/components/post-form";
import { db } from "@/lib/db";
import React from "react";

interface EditPageProps {
  params: {
    postId: string;
  };
}

const EditPage = async ({ params }: EditPageProps) => {
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
  });

  return (
    <div>
      <PostForm type="edit" data={post} />
    </div>
  );
};

export default EditPage;
