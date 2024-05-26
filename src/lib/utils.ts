import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmptyObject(obj: object | undefined) {
  if (obj === undefined) return false;
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
