import { ClassValue, clsx } from "clsx"; // Importing clsx for merging class names
import { twMerge } from "tailwind-merge"; // Importing twMerge for merging Tailwind CSS classes

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Combining class names using clsx and twMerge
}
