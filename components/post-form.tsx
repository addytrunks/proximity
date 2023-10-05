"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { createPostFormSchema } from "@/types.t";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { LocateFixed, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Post } from "@prisma/client";

interface PostFormProps {
  type: "create" | "edit";
  data?: Post | null;
}

const PostForm = ({ type, data }: PostFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isLoading },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      caption: data?.caption || "",
      imageUrl: data?.imageUrl || "",
      c_lat: data?.c_lat || "",
      c_long: data?.c_long || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createPostFormSchema>) => {
    try {
      if (type === "create") {
        await axios.post("/api/posts/", values);
        toast.success("Post created successfully!", {
          position: "bottom-right",
        });
        router.push("/");
      } else {
        await axios.patch(`/api/posts/${data?.id}/`, values);
        toast.success("Post updated successfully!", {
          position: "bottom-right",
        });
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("c_lat", position.coords.latitude.toString());
        setValue("c_long", position.coords.longitude.toString());
        toast.success("You have been located successfully!");
      },
      (error: GeolocationPositionError) => {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Please allow location access to create a post!");
        }
      }
    );
    console.log("Location");
  };

  return (
    <div className="container p-6 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full font-semibold text-4xl flex items-center space-x-2">
        <span>{type === "create" ? "Create" : "Edit"} a</span>
        <span className="text-[#58A6FF]">Post</span>
      </div>
      <Card className="w-full border-gray-700 mt-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-4">
            <span>Locate Me</span>
            <span className="hover:cursor-pointer" onClick={getCurrentLocation}>
              <LocateFixed className="w-6 h-6 text-[#58A6FF]" />
            </span>
          </CardTitle>
          {(errors.c_lat || errors.c_long) && (
            <p className="text-xs text-red-500">
              Allow access to location by clicking on the location logo above.
            </p>
          )}
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            <div className="border border-dashed border-gray-600 rounded-lg">
              {watch().imageUrl.length > 0 ? (
                <div className="relative w-[465px] h-[465px] mx-auto">
                  <Image
                    fill
                    src={watch().imageUrl}
                    alt="image"
                    className="object-contain"
                  />
                  <button
                    className="bg-rose-500 text-white p-[2px] text-sm rounded-full absolute top-[4.5rem] right-0 shadow-sm"
                    type="button"
                    onClick={() => setValue("imageUrl", "")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) =>
                    setValue("imageUrl", res?.[0].url!)
                  }
                />
              )}
            </div>
            {errors.imageUrl && (
              <span className="text-red-500 text-xs">
                {errors.imageUrl.message}
              </span>
            )}
            <textarea
              disabled={isLoading || isSubmitting}
              {...register("caption")}
              className="flex min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-gray-600"
              placeholder="Enter your creative caption here."
            />
            {errors.caption && (
              <span className="text-red-500 text-xs">
                {errors.caption.message}
              </span>
            )}

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-[#58A6FF]"
            >
              {type === "create" ? "Create" : "Edit"} post
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostForm;
