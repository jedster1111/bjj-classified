import KoaRouter from "koa-router";
import { isError } from "util";
import { getVideos } from "../store/videos/store/getVideos";
import { getVideo } from "../store/videos/store/getVideo";
import { createVideoDtoValidator } from "bjj-common";
import { uuid } from "uuidv4";
import { createVideo } from "../store/videos/store/createVideo";

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

videos.get(videosRoutes.getVideo, "/:id", async (ctx) => {
  const { id } = ctx.params;
  const fetchedVideo = await getVideo(id);

  if (isError(fetchedVideo)) {
    ctx.throw("There was an error fetching the video from the db.");
    return;
  }

  if (!fetchedVideo) {
    ctx.status = 404;
    return;
  }

  ctx.body = fetchedVideo;
});

videos.post(videosRoutes.createVideo, "/", async (ctx) => {
  const validationResult = createVideoDtoValidator(ctx.request.body);

  if (isError(validationResult)) {
    ctx.throw(400, validationResult);
    return;
  }

  const dbVideoDto = { id: uuid(), ...validationResult };
  const createdVideo = await createVideo(dbVideoDto);

  if (isError(createdVideo)) {
    ctx.throw("Failed to create video.");
    return;
  }

  ctx.status = 201;
  ctx.body = createdVideo;
});
