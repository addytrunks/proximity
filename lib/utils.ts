import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const haversineFormula = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const earthRadius = 6371;

  // Converting to radians
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Angular distance
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
};

export const withinRadius = (
  userLat: string,
  userLong: string,
  lat: string,
  long: string
) => {
  const radius = haversineFormula(
    parseFloat(userLat),
    parseFloat(userLong),
    parseFloat(lat),
    parseFloat(long)
  );
  if (radius < 5) {
    return true;
  } else {
    return false;
  }
};

export const calculateRadius = (
  userLat: string,
  userLong: string,
  lat: string,
  long: string
) => {
  const radius = haversineFormula(
    parseFloat(userLat),
    parseFloat(userLong),
    parseFloat(lat),
    parseFloat(long)
  );
  return radius.toFixed(1);
};
