import { env } from '@main/config/sandbox.env';

export const makeWeatherApiUrl = (params: string = '') =>
  `${env.weatherAPIUrl}${env.weatherDataAPI}?appId=${env.weatherApiKey}${params}`;
