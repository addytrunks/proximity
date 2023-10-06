import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { withinRadius } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const UsersAround = async () => {
  const users = await db.profile.findMany({
    take: 5,
  });
  const currUser = await currentProfile();

  const filteredUsers = users.filter((user) =>
    withinRadius(currUser?.c_lat!, currUser?.c_long!, user.c_lat, user.c_long) && user.id !== currUser?.id
  );

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">
        <span className="text-[#58A6FF]">Users </span>
        around you
      </p>

      {filteredUsers.map((user) => (
        <div className="flex items-center gap-x-4 p-3" key={user.id}>
          <div className="relative w-4 h-4">
            <Image fill alt='img' className="rounded-full" src={user.imageUrl}/>
          </div>
          <p className="font-semibold">{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersAround;
