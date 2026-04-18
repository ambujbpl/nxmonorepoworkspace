import type { CreateUserBody } from '../../types/index.js';

export type { CreateUserBody };

export const postUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 100, pattern: '.*\\S.*' },
    email: {
      type: 'string',
      maxLength: 255,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
    password: { type: 'string', minLength: 8, maxLength: 255 },
    age: { type: 'integer', minimum: 0, maximum: 150 },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
} as const;
