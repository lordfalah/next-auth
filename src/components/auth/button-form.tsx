import React from "react";
import { Button } from "@/components/ui/button";
import Google from "@/icons/google";

const ButtonForm = ({ name }: { name: string }) => {
  return (
    <div className="space-y-4">
      <Button type="submit" className="w-full">
        {name}
      </Button>
      <Button variant="outline" className="flex h-auto w-full gap-x-3.5">
        <Google className="h-8 w-8 " />
        Login with Google
      </Button>
    </div>
  );
};

export default ButtonForm;
