import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <Loader2 className="w-6 h-6 text-gray-500  animate-spin" />
    </div>
  );
};

export default Loader;
