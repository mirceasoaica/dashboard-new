import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const YMD_FORMAT = "yyyy-MM-dd";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
