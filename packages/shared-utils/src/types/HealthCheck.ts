export type ApiMessageResponse = {
  message: string;
};

export type HealthCheckResponse = {
  status: string;
  message: string;
  userCount?: number;
};
