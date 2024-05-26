"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type ICardWrapper = {
  cardTitle: string;
  cardDescription: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
  classNameHeader?: string;
};

const CardWrapper: React.FC<ICardWrapper> = ({
  cardDescription,
  cardTitle,
  children,
  backButtonHref,
  backButtonLabel,
  classNameHeader = "text-left",
}) => {
  return (
    <Card className="w-full max-w-sm sm:w-[400px] md:w-[425px]">
      <CardHeader className={classNameHeader}>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}

        <div className="mt-4 text-center text-sm">
          {backButtonLabel}{" "}
          <Link
            href={`/auth/${backButtonHref.toLocaleLowerCase()}`}
            className="underline"
          >
            {backButtonHref}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardWrapper;
