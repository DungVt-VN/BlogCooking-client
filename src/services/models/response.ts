import { BaseResponse } from './baseResponse';
export interface Response<T> extends BaseResponse {
  data: T | null;
}
