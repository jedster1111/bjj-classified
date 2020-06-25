export async function wait(timeToWaitMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeToWaitMs)
  })
}