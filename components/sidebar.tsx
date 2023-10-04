"use client";

import { Home, LogOut, Plus, Radar, User2 } from "lucide-react";
import { Profile } from "@prisma/client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface SidebarProps {
  profile: Profile | null;
}

const Sidebar = ({ profile }: SidebarProps) => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="container h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div
            onClick={() => router.push("/")}
            className="rounded-full h-14 w-14 p-2 flex items-center justify-center cursor-pointer"
          >
            <Radar size={28} color="#58A6FF" />
          </div>

          <div className="flex items-center p-4 gap-x-4 cursor-pointer" onClick={() => router.push('/')}>
            <Home className="w-8 h-w-8" />
            <p className="text-lg md:flex">Home</p>
          </div>

          <div className="flex items-center p-4 gap-x-4 cursor-pointer" onClick={() => router.push(`/profile/${profile?.id}`)}>
            <User2 className="w-8 h-w-8 text-center" />
            <p className="text-lg md:flex">Profile</p>
          </div>

          <div
            className="flex items-center p-4 gap-x-4 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="w-8 h-w-8" />
            <p className="text-lg md:flex">Logout</p>
          </div>

          <div className="p-4">
            <button
              onClick={() => router.push("/post/create")}
              type="submit"
              className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-[#58A6FF] w-fit text-center"
            >
              <div className="flex items-center gap-x-5">
                <Plus className="h-4 w-4 font-semibold" />
                <p className="text-white md:flex text-sm">Create Post</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
