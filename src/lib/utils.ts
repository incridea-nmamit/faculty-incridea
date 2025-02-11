import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function facultyPassID(id: number) {
  const paddedId = id.toString().padStart(4, "0");
  return `F-${paddedId}`;
}

export function dependantPassID(id: number) {
  const paddedId = id.toString().padStart(4, "0");
  return `D-${paddedId}`;
}
