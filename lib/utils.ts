import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import haversine from 'haversine-distance'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const withinRadius = (userLat:number,userLong:number,lat: number, long: number) => {

  const radius = (haversine({ lat: userLat, lng: userLong }, { lat: lat, lng: long }))/1000;
  console.log(radius)
  if(radius < 5){
    console.log('Within 5KM radius')
    return true
  }else{
    console.log('Not within 5KM radius')
    return false
  }
};