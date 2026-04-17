import type { User } from '../../types/index.js';

export type PutUserBody = Partial<Omit<User, 'password'>>;

export const putUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 100, pattern: '.*\\S.*' },
    email: {
      type: 'string',
      maxLength: 255,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
    age: { type: 'integer', minimum: 0, maximum: 150 },
    isActive: { type: 'boolean' },
  },
  minProperties: 1,
  additionalProperties: false,
} as const;
