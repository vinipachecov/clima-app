import { FetchRemoteWeatherStatus } from '@data/usecases/FetchRemoteWeatherStatus';
import { FetchWeatherStatus } from '@domain/usecases/FetchWeatherStatus';
import { makeFetchHttpClient } from '../../http/FetchHttpClientFactory';
import { makeWeatherApiUrl } from '../../http/WeatherApiUrlFactory';

export const makeFetchRemoteWeatherStatus = (): FetchWeatherStatus => {
  return new FetchRemoteWeatherStatus(
    makeFetchHttpClient(),
    makeWeatherApiUrl(),
  );
};
