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
          <div className="h-full w-fit mx-auto">
            <Sidebar profile={profile} />
          </div>
        </div>
        <div className="lg:col-span-6 col-span-9 border-l border-gray-800 overflow-y-auto">{children}</div>
        <div className="h-full col-span-3 border-l border-gray-800 responsive">
          <UsersAround />
        </div>
      </div>
    </div>
  );
}
