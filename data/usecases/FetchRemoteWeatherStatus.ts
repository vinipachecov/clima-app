import { HttpClient, HttpStatusCode } from '@data/http/HttpClient';
import {
  RemoteWeatherStatusModel,
  RemoteWeatherStatusModelProps,
} from '@data/models/RemoteWeatherStatusModel';
import { UnexpectedError, AccessDeniedError } from '@domain/errors';
import {
  FetchWeatherStatus,
  FetchWeatherStatusProps,
} from '@domain/usecases/FetchWeatherStatus';

export class FetchRemoteWeatherStatus implements FetchWeatherStatus {
  private httpClient: HttpClient<RemoteWeatherStatusModelProps>;
  private url: string;
  constructor(httpClient: HttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  async fetch({ latitude, longitude }: FetchWeatherStatusProps) {
    try {
      const response = await this.httpClient.request({
        url: `${this.url}&lat=${latitude}&lon=${longitude}`,
        method: 'get',
      });
      switch (response.statusCode) {
        case HttpStatusCode.ok:
          return RemoteWeatherStatusModel.toEntity(response.body);
        case HttpStatusCode.Unauthorized:
          throw new AccessDeniedError();
        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      throw error;
    }
  }
}
