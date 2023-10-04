import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import haversine from 'haversine-distance'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const withinRadius = (userLat:string,userLong:string,lat: string, long: string) => {

  const radius = (haversine({ lat: parseFloat(userLat), lng: parseFloat(userLong) }, { lat: parseFloat(lat), lng: parseFloat(long) }))/1000;
  if(radius < 5){
    return true
  }else{
    return false
  }
};



export const calculateRadius = (userLat:string,userLong:string,lat: string, long: string) => {

  const radius = (haversine({ lat: parseFloat(userLat), lng: parseFloat(userLong) }, { lat: parseFloat(lat), lng: parseFloat(long) }))/1000;
  return radius.toFixed(1)
};