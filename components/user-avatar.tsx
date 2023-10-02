import Image from "next/image";
import React from "react";

interface UserAvatarProps {
  src: string;
}

const UserAvatar = ({ src }: UserAvatarProps) => {

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
