export type ObjectIdParams = {
  id: string;
};

export const objectIdParamSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^[a-fA-F0-9]{24}$',
    },
  },
  required: ['id'],
  additionalProperties: false,
} as const;
