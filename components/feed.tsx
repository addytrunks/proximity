"use client";

import { Profile } from "@prisma/client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { formatDistance } from "date-fns";
import { calculateRadius, withinRadius } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { postWithProfile } from "@/types.t";
import Loader from "./loader";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeedProps {
  userProfile: Profile;
}

const Feed = ({ userProfile }: FeedProps) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { ref, inView } = useInView();
  const router = useRouter();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage,hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam = "" }) => {
        const res = await axios.get(`/api/posts?cursor=${pageParam}`);
        return res.data;
      },
      getNextPageParam: (lastPage) => lastPage?.nextCursor ?? false,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!isMounted) return null;
  if (isLoading) return <Loader />;

  const filteredPosts: any = data?.pages.map((page) => {
    return page.posts.filter((post: postWithProfile) =>
      withinRadius(
        post.c_lat,
        post.c_long,
        userProfile.c_lat,
        userProfile.c_long
      )
    );
  });

  return (
    <div>
      {data &&
        data.pages.map((page) => (
          <React.Fragment key={page.nextId ?? "lastPage"}>
            {page.posts.map((post: postWithProfile) => {
              if (
                withinRadius(
                  post.c_lat,
                  post.c_long,
                  userProfile.c_lat,
                  userProfile.c_long
                )
              ) {
                return (
                  <Card
                    key={post.id}
                    className="w-full border-gray-700 mt-5 shadow-lg"
                  >
                    <CardHeader className="flex items-center space-x-5">
                      <div className="relative h-8 w-8">
                        <Image
                          src={post.Profile?.imageUrl}
                          alt="post_image"
                          className="rounded-full"
                          fill
                        />
                      </div>
                      <span className="font-semibold">
                        {userProfile.id === post.Profile?.id
                          ? "You"
                          : post.Profile?.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatDistance(new Date(), new Date(post.createdAt))}{" "}
                        ago
                      </span>
                      <span className="text-gray-500 text-xs text-right">
                        {calculateRadius(
                          userProfile.c_lat,
                          userProfile.c_long,
                          post.c_lat,
                          post.c_long
                        )}{" "}
                        KM away from you.
                      </span>
                      {userProfile.id === post.Profile?.id && (
                        <span
                          className="cursor-pointer"
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
                );
              }
            })}
          </React.Fragment>
        ))}
      {isFetchingNextPage && <Loader />}
      {filteredPosts?.some((post: any) => post.length === 0) && !hasPreviousPage  && (
        <div className="flex items-center justify-center h-[100vh]">
          <p className="text-xl font-semibold text-gray-500">
            No more posts around you. 😭
          </p>
        </div>
      )}
      <span ref={ref} />
    </div>
  );
};

export default Feed;
