import { Middleware } from "koa";

export function logger(): Middleware {
  return async (ctx, next) => {
    console.log("Url:", ctx.url);
    await next();
  };
}
