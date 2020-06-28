import { wait } from "./wait"
import { retry } from "./retry"
import { isError } from "./isError"
import { isErrorCode } from "./api/isErrorCode"

const meaningOfLife = () => 42

export { wait, meaningOfLife, retry, isError, isErrorCode }
