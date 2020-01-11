/**
 * https://github.com/Microsoft/TypeScript/issues/21732#issuecomment-562782577
 */
export const hasProp = <O extends object, K extends PropertyKey>(
  obj: O,
  propKey: K
): obj is O & { [key in K]: unknown } => propKey in obj;
