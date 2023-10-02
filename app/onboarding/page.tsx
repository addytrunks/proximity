"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import UserAvatar from "@/components/user-avatar";
import { createUserFormSchema } from "@/types.t";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import "@uploadthing/react/styles.css";

const OnboardingPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isLoading },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      username: "",
      bio: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createUserFormSchema>) => {
    console.log(values);
  };

  return (
    <div className="max-w-6xl flex mx-auto items-center justify-center min-h-screen">
      <div className="flex-col gap-y-5">
        <p className="font-semibold text-3xl">
          Welcome to <span className="text-[#58A6FF]">Proximity</span>
        </p>
        <Card className="w-[500px] border-gray-700 mt-5">
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription className="text-zinc-500">
              Set up your user account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5"
            >
              <div className="flex items-center gap-x-10">
                <UserAvatar src={watch().imageUrl} />
                <UploadButton<OurFileRouter>
                  endpoint="imageUploader"
                  appearance={{
                    button: "bg-[#58A6F8]",
                  }}
                  onClientUploadComplete={(res: any) => {
                    setValue("imageUrl", res[0]?.url!);
                  }}
                />
              </div>
              {errors.imageUrl && (
                <span className="text-red-500 text-xs">
                  {errors.imageUrl.message}
                </span>
              )}

              <input
                disabled={isLoading || isSubmitting}
                {...register("username")}
                type="text"
                className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-gray-500"
                placeholder="Enter your username"
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}

              <textarea
                disabled={isLoading || isSubmitting}
                {...register("bio")}
                className="flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-gray-500"
                placeholder="Enter your creative bio here."
              />
              {errors.bio && (
                <span className="text-red-500 text-xs">
                  {errors.bio.message}
                </span>
              )}

              <button
                disabled={isLoading || isSubmitting}
                className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-[#58A6FF]"
              >
                Create profile
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;