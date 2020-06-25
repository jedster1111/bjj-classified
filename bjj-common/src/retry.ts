import { wait } from "./wait"

export async function retry<T>(callback: () => T | Promise<T>, timeToWait: number): Promise<T> {
  try {
    return await callback()
  } catch (e) {
    await wait(timeToWait);
    return await retry(callback, timeToWait)
  }
}