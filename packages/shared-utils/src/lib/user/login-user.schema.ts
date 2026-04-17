import type { LoginBody } from '../../types/index.js';

export type { LoginBody };

export const loginUserSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      maxLength: 255,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
    password: { type: 'string', minLength: 8, maxLength: 255 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const;
