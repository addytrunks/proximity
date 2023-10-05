import Sidebar from "@/components/sidebar";
import UsersAround from "@/components/users-around";
import { currentProfile } from "@/lib/current-profile";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await currentProfile();

  return (
    <div>
      <div className="h-full grid grid-cols-12">
        <div className="col-span-3 container flex flex-col">
          <div className="w-fit mx-auto sticky top-0">
            <Sidebar profile={profile} />
          </div>
        </div>
        <div className="lg:col-span-6 col-span-9 border-l border-gray-800 overflow-y-auto">{children}</div>
        <div className="col-span-3 border-l border-gray-800 responsive sticky top-0">
          <UsersAround />
        </div>
      </div>
    </div>
  );
}
