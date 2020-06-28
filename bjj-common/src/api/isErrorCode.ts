export function isErrorCode(status: number) {
  const firstDigitOfStatus = status.toString()[0];
  return firstDigitOfStatus === "5";
}
