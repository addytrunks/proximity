import { currentProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await currentProfile();

  if (!profile) return redirect("/onboarding");

  return (
    <>
      <UserButton afterSignOutUrl="/" />
      Hello From the other side
    </>
  );
}
