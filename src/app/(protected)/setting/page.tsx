import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const SettingPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center">
      <p>{JSON.stringify(session)}</p>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};

export default SettingPage;
