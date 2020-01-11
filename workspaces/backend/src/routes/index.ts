import Router from "koa-router";
import { getAthletes } from "../store/getAthletes";
import { session } from "../neo4j";
import { getVideos } from "../store/getVideos";

const router = new Router();

router.get("/athletes", async ctx => {
  const athletes = await getAthletes(session);
  ctx.body = athletes.map(a => a.name);
});
router.get("/videos", async ctx => {
  const vidoes = await getVideos(session);
  ctx.body = vidoes.map(a => a.url);
});

const routerMiddleWare = router.routes();

export default routerMiddleWare;
