import { TypeC, Props } from "io-ts";
import { isLeft } from "fp-ts/lib/Either";
import { formatValidationErrors } from "io-ts-reporters";

export function createValidator<T extends Props>(codec: TypeC<T>) {
  return (thingToValidate: unknown) => {
    const decodeResult = codec.decode(thingToValidate);

    if (isLeft(decodeResult)) {
      return new Error(formatValidationErrors(decodeResult.left).join(".\n"));
    }

    return decodeResult.right;
  };
}
