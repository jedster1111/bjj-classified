import { createValidator } from "../../validate";
import { CreateMoveDtoCodec } from "./Move";

export const createMoveDtoValidator = createValidator(CreateMoveDtoCodec)
