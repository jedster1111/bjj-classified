import { CreateMoveDtoCodec } from "./MoveDtos";
import { createValidator } from "../helpers/createValidator";

export const createMoveDtoValidator = createValidator(CreateMoveDtoCodec);
