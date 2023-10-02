"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div
        className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        cursor-pointer 
        lg:hidden
      "
      >
        <Icon size={28} color="white" />
      </div>
      <div
        className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        cursor-pointer
        items-center
      "
      >
        <Icon size={24} color="white" />
        <Link href={href} className="hidden lg:block text-white text-lg">
          {label}
        </Link>
      </div>
    </div>
  );
};

export default SidebarItem;
