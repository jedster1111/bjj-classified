// import pino from "pino"; 
import { clsProxify,  } from 'cls-proxify'

export const originalLogger = {
  info: (...args: any[]) => console.log("info", ...args),
  error: (...args: any[]) => console.log("error", ...args)
}

export const loggerKey = 'clsKeyLogger';
export const logger = clsProxify(loggerKey, originalLogger);
