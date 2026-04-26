export class ApiResponseDto<T = unknown> {
  success!: boolean;
  data?: T;
  message?: string;
  requestId?: string;
  timestamp!: string;
}
