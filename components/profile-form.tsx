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
import "@uploadthing/react/styles.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LocateFixed } from "lucide-react";
import { Profile } from "@prisma/client";
import { UploadButton } from "@/lib/uploadthing";

interface ProfileFormProps {
  type: "edit" | "create";
  profile?: Profile;
  imageUrl?: string;
}

const ProfileForm = ({ profile, type, imageUrl }: ProfileFormProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isLoading },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      username: profile?.name || "",
      bio: profile?.bio || "",
      imageUrl: imageUrl ? imageUrl : profile?.imageUrl || "",
      c_lat: profile?.c_lat || "",
      c_long: profile?.c_long || "",
    },
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("c_lat", position.coords.latitude.toString());
        setValue("c_long", position.coords.longitude.toString());
        toast.success("Location updated successfully!");
      },
      (error: GeolocationPositionError) => {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Please allow location access to create a post!");
        }
      }
    );
    console.log("Location");
  };

  const onSubmit = async (values: z.infer<typeof createUserFormSchema>) => {
    try {
      if (type === "create") {
        await axios.post(`/api/profile/`, values);
        toast.success("Your profile has been created successfully!", {
          position: "bottom-right",
        });
      } else {
        await axios.patch(`/api/profile/${profile?.id}`, values);
        toast.success("Your profile has been updated successfully!", {
          position: "bottom-right",
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="container p-6 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full font-semibold text-4xl flex items-center space-x-2">
        <p className="font-semibold text-4xl">
          {type === "create" ? (
            <p className="font-semibold text-4xl">
              Welcome to <span className="text-[#58A6FF]">Proximity</span>
            </p>
          ) : (
            <p>
              Edit <span className="text-[#58A6FF]">Profile</span>
            </p>
          )}
        </p>
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
          {type === "create" && (
            <CardDescription className="text-zinc-500">
              Set up your user account
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            <div className="flex items-center gap-x-10">
              <UserAvatar src={watch().imageUrl} />
              <UploadButton
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
              <span className="text-red-500 text-xs">{errors.bio.message}</span>
            )}

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-[#58A6FF]"
            >
              {type === "create" ? "Create" : "Edit"} profile
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
