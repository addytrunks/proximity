import Feed from "@/components/feed";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await currentProfile();

  if (!profile) return redirect("/onboarding");

  return (
    <div className="p-4">
      <h2 className="font-semibold text-4xl flex items-center space-x-2">
        <span>Your</span> <span className="text-[#58A6FF]">Feed</span>
      </h2>

      <Feed userProfile={profile} />
    </div>
  );
}
