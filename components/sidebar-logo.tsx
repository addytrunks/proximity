"use client"

import { Radar } from "lucide-react";
import { useRouter } from "next/navigation";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-14
        w-14
        p-2 
        flex 
        items-center 
        justify-center  
        cursor-pointer
    ">
      <Radar size={28} color="#58A6FF" />
    </div>
  );
};

export default SidebarLogo;