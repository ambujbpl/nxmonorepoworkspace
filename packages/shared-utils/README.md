# @my-monorepo/shared-utils

Shared TypeScript types and AJV-based validation helpers used across the monorepo.

## What this package provides

- Shared API response and user-related types.
- Reusable JSON schema objects for user and parameter validation.
- A `validateBody` helper that throws NestJS `BadRequestException` errors when input is invalid.

## Install and import

This package is part of the Nx workspace and is consumed through the workspace package name:

```ts
import {
  changePasswordSchema,
  loginUserSchema,
  objectIdParamSchema,
  postUserSchema,
  putUserSchema,
  validateBody,
  type CreateUserBody,
  type LoginBody,
  type UserResponse,
} from '@my-monorepo/shared-utils';
```

## Exported types

The package exports these shared types:

- `CreateUserBody`
- `LoginBody`
- `ChangePasswordBody`
- `User`
- `UserResponse`
- `LoginResponse`
- `ChangePasswordResponse`
- `ApiMessageResponse`
- `HealthCheckResponse`

## Exported schemas and helpers

- `postUserSchema`: validate create-user payloads.
- `putUserSchema`: validate partial user updates.
- `loginUserSchema`: validate login payloads.
- `changePasswordSchema`: validate password change requests.
- `objectIdParamSchema`: validate route params containing a Mongo-style 24-char id.
- `validateBody<T>(schema, body, message?)`: validates input and throws `BadRequestException` on failure.

## Example: validating a request body

```ts
import {
  postUserSchema,
  validateBody,
  type CreateUserBody,
} from '@my-monorepo/shared-utils';

const payload: unknown = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  password: 'strong-password',
  age: 28,
};

validateBody<CreateUserBody>(postUserSchema, payload, 'Invalid user payload');

// payload is now narrowed to CreateUserBody
```

## Example: validating route params

```ts
import {
  objectIdParamSchema,
  validateBody,
  type ObjectIdParams,
} from '@my-monorepo/shared-utils';

const params: unknown = { id: '507f1f77bcf86cd799439011' };

validateBody<ObjectIdParams>(objectIdParamSchema, params, 'Invalid user id');
```

## Notes

- The package is marked `private`, so it is intended for workspace-internal use.
- Runtime validation is powered by `ajv`.
- Validation failures include AJV error details in the thrown NestJS exception response.
