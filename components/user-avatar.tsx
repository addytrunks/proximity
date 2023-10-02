"use client";

import Image from "next/image";
import Avatar from "react-avatar";
import React from "react";
import { useUser } from "@clerk/nextjs";

interface UserAvatarProps {
  src?: string;
}

const UserAvatar = ({ src }: UserAvatarProps) => {
  const { user } = useUser();

  if (!src)
    return (
      <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image
          src='/avatar.png'
          className="aspect-square h-full w-full"
          fill
          alt="avatar"
        />
      </div>
    );
  return (
    <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
      <Image
        src={src}
        className="aspect-square h-full w-full"
        fill
        alt="avatar"
      />
    </div>
  );
};

export default UserAvatar;
