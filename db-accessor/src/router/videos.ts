import KoaRouter from "koa-router";
import { isError } from "util";
import { getVideos } from "../store/videos/store/getVideos";

export const videosRoutes = {
  getVideos: "getVideos",
  getVideo: "getVideo",
  createVideo: "createVideo",
};

export const videos = new KoaRouter();

videos.get(videosRoutes.getVideos, "/", async (ctx) => {
  const fetchedVideos = await getVideos();

  if (isError(fetchedVideos)) {
    ctx.throw("There was an error fetching the videos from the db.");
    return;
  }

  ctx.body = fetchedVideos;
});

// videos.get(videosRoutes.getVideo, "/:id", async (ctx) => {
//   const { id } = ctx.params;
// });
