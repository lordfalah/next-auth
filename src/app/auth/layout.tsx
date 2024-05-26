import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 sm:px-0">
      {children}
    </main>
  );
};

export default AuthLayout;
