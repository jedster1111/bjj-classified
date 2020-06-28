import pino from "pino";
import { clsProxify } from "cls-proxify";

export const originalLogger = pino({
  prettyPrint: {
    colorize: true,
  },
});

export const loggerKey = "clsKeyLogger";
export const logger = clsProxify(loggerKey, originalLogger);
