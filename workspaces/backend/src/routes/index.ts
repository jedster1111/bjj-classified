import Router from "koa-router";
import { getAthletes } from "../store/getAthletes";
import { session } from "../neo4j";

const router = new Router();

router.get("/athletes", async ctx => {
  const athletes = await getAthletes(session);
  ctx.body = athletes.map(a => a.name);
});

const routerMiddleWare = router.routes();

export default routerMiddleWare;
