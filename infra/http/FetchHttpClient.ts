import { HttpRequestProps } from '@data/http/HttpClient';
import { UnexpectedError } from '@domain/errors';

export class FetchHttpClient {
  async request(data: HttpRequestProps) {
    try {
      const response = await fetch(data.url, {
        method: data.method,
        headers: data.headers,
        body: data.body,
      });

      const body = await response.json();
      return {
        statusCode: response.status,
        body,
      };
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
