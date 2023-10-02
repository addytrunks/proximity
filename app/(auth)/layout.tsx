import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
};

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
      <div className="min-h-screen flex justify-center items-center">
        {children}
      </div>
  );
}

export default AuthLayout;
