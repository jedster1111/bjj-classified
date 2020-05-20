import Router from "koa-router";
import { getAthletes } from "../store/athletes/getAthletes";
import { session } from "../neo4j";
import { getVideos } from "../store/videos/getVideos";
import { getVideo } from "../store/videos/getVideo";

const router = new Router();

router.get("/athletes", async ctx => {
  const athletes = await getAthletes(session);
  ctx.body = athletes.map(a => a.name);
});
router.get("/videos", async ctx => {
  const videos = await getVideos(session);
  ctx.body = videos.map(a => a.url);
});
router.get("/video", async ctx => {
  const video = await getVideo(session);
  ctx.body = video;
});

const routerMiddleWare = router.routes();

export default routerMiddleWare;
