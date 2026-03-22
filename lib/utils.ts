// lib/map-utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ... your extractCoordinates function stays down here!

export function extractCoordinates(url: string) {
  // This Regex looks for the "@" symbol followed by two long numbers separated by a comma
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex);

  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }

  // If it can't find the numbers, return a fallback (e.g., Center of the Map)
  console.warn("Could not extract coordinates from link:", url);
  return { lat: 0, lng: 0 }; 
}