import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import ProfileForm from "@/components/profile-form";

const OnboardingPage = async() => {

  const user = await currentProfile();
  const currUser = await currentUser();

  if (user) return redirect("/");
  return (
    <>
      <ProfileForm type="create" imageUrl={currUser?.imageUrl}/>
    </>
  );
};

export default OnboardingPage;
