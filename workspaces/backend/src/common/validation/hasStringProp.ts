import { hasProp } from "../hasProp";

export function hasStringProp<O extends object, K extends PropertyKey>(
  obj: unknown,
  propKey: K
): obj is O & { [key in K]: string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasProp(obj, propKey) &&
    obj[propKey] &&
    typeof obj[propKey] === "string"
  );
}
