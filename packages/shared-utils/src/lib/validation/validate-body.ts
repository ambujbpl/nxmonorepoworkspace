import { BadRequestException } from '@nestjs/common';
import { Ajv, type AnySchema, type ValidateFunction } from 'ajv';

const ajv = new Ajv({ allErrors: true });
const validatorCache = new WeakMap<object, ValidateFunction>();

function getValidator<T>(schema: AnySchema): ValidateFunction<T> {
  const cachedValidator = validatorCache.get(schema as object);

  if (cachedValidator) {
    return cachedValidator as ValidateFunction<T>;
  }

  const validator = ajv.compile<T>(schema);
  validatorCache.set(schema as object, validator as ValidateFunction);

  return validator;
}

export function validateBody<T>(
  schema: AnySchema,
  body: unknown,
  message = 'Invalid user payload',
): asserts body is T {
  const validator = getValidator<T>(schema);

  if (!validator(body)) {
    throw new BadRequestException({
      message,
      errors: validator.errors ?? [],
    });
  }
}
