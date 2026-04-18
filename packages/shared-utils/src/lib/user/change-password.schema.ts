import type { ChangePasswordBody } from '../../types/index.js';

export type { ChangePasswordBody };

export const changePasswordSchema = {
  type: 'object',
  properties: {
    currentPassword: { type: 'string', minLength: 8, maxLength: 255 },
    newPassword: { type: 'string', minLength: 8, maxLength: 255 },
  },
  required: ['currentPassword', 'newPassword'],
  additionalProperties: false,
} as const;
