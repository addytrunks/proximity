import { currentProfile } from "@/lib/current-profile";
import OnboardingForm from "./form";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

const OnboardingPage = async() => {

  const user = await currentProfile();
  const currUser = await currentUser();

  if (user) return redirect("/");
  return (
    <>
      <OnboardingForm imageUrlProp={currUser?.imageUrl!}/>
    </>
  );
};

export default OnboardingPage;
