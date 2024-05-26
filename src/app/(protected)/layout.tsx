import React from "react";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default ProtectedLayout;
