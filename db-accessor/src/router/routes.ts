import { movesRoutes } from "./moves";
import { videosRoutes } from "./videos";

export const routes = {
  moves: movesRoutes,
  videos: videosRoutes,
} as const;
