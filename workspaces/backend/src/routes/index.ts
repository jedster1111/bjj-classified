import Router from "koa-router";
import { getAthletes } from "../store/athletes/getAthletes";
import { session } from "../neo4j";
import { getVideos } from "../store/videos/getVideos";

const router = new Router();

router.get("/athletes", async ctx => {
  const athletes = await getAthletes(session);
  ctx.body = athletes.map(a => a.name);
});
router.get("/videos", async ctx => {
  const videos = await getVideos(session);
  ctx.body = videos.map(a => a.url);
});

const routerMiddleWare = router.routes();

export default routerMiddleWare;
