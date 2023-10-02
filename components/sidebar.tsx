"use client";

import { Home, LogOut, User2 } from "lucide-react";
import SidebarItem from "./sidebar-item";
import SidebarLogo from "./sidebar-logo";
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
    <div className="container col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          <SidebarItem icon={Home} label={"Home"} href={"/"} />
          <SidebarItem
            icon={User2}
            label={"Profile"}
            href={`/users/${profile?.id!}`}
          />
          <div onClick={() => signOut()}>
            <SidebarItem icon={LogOut} label="Logout" href="#" />
          </div>

          <div className="p-4">
            <button
              onClick={() => router.push("/create-post")}
              type="submit"
              className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-[#58A6FF] w-full text-center"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
