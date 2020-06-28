export function isError(thingToCheck: unknown): thingToCheck is Error {
  return thingToCheck instanceof Error;
}