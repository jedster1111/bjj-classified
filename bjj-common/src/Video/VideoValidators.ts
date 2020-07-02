import { createValidator } from "../helpers";
import { CreateVideoDtoCodec } from "./VideoDtos";

export const createVideoDtoValidator = createValidator(CreateVideoDtoCodec);
