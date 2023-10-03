import Sidebar from "@/components/sidebar";
import { currentProfile } from "@/lib/current-profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}){

  const profile = await currentProfile();

  return (
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="grid grid-cols-4 h-full">
            <Sidebar profile={profile}/>
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
            </div>
        </div>
      </div>
  );
}
