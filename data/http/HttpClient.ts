export interface HttpRequestProps {
  url: string;
  headers?: {
    [key: string]: string;
  };
  method: HttpMethod;
  body?: {
    [key: string]: unknown;
  };
}
export enum HttpStatusCode {
  ok = 200,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
  Unauthorized = 401,
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface HttpResponse<T> {
  statusCode: number;
  body?: T;
  headers?: {
    [key: string]: string;
  };
}

export interface HttpClient<R = any> {
  request({
    url,
    method,
    headers,
    body,
  }: HttpRequestProps): Promise<HttpResponse<R>>;
}
