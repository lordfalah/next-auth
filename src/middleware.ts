import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
} from "./routes";
import { NextResponse } from "next/server";
const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const isLogged = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPathError = nextUrl.pathname.startsWith("/auth/error");
  const isErrorAuth = !!req.nextUrl.searchParams.get("error");

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLogged) {
      return NextResponse.redirect(new URL(DEFFAULT_LOGIN_REDIRECT, req.url));
    }

    if (isPathError && !isErrorAuth) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  if (!isLogged && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
