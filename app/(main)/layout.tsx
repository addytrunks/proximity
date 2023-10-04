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
}) {
  const profile = await currentProfile();

  return (
    <div className="h-full flex">
      <div className="lg:w-[430px] md:w-[230px] sm:w-[130px]">
        <Sidebar profile={profile} />
      </div>
      <div className="flex-1 overflow-y-auto border-l border-neutral-800">
        {children}
      </div>
    </div>
  );
}
