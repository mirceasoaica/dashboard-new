import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const YMD_FORMAT = "yyyy-MM-dd";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Merges 2 objects into a single object. Identical keys with non array values will be replaced, array values will be merged
 *
 * @param obj1 object|null|undefined
 * @param obj2 object|null|undefined
 */
export function mergeObjects(obj1: object|null|undefined, obj2: object|null|undefined) {
  if(!obj1) {
    return obj2;
  }

  if(!obj2) {
    return obj1;
  }

  const result: any = {...obj1 || {}};

  Object.keys(obj2 || {}).forEach((key:string) => {
    const value: any = (obj2 as any)[key];

    if(result[key] == undefined) {
      result[key] = value;
    } else if(Array.isArray(result[key]) && Array.isArray(value)) {
      // both values are arrays. we can append obj2 values to obj1 values
      result[key] = [
          ...result[key],
          ...value,
      ];
    } else if(typeof result[key] === "object" && typeof value === "object") {
      result[key] = mergeObjects(result[key], value);
    } else {
      // no way to merge properly. the second object will overwrite the first
      result[key] = value;
    }
  });

  return result;
}