import Feed from "@/components/feed";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { withinRadius } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await currentProfile();

  if (!profile) return redirect("/onboarding");

  const posts = await db.post.findMany({
    include:{
      Profile:true
    }
  })

  const filteredPosts = posts.filter((post) => withinRadius(profile.c_lat,profile.c_long,post.c_lat,post.c_long));


  return (
    <div className="p-4">
      <h2 className="font-semibold text-4xl flex items-center space-x-2">
        <span>Your</span> <span className="text-[#58A6FF]">Feed</span>
      </h2>

      <Feed postsWithProfile={filteredPosts} userProfile={profile}/>
    </div>
  );
}
