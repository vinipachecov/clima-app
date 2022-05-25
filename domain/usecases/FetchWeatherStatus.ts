import { WeatherStatusEntity } from '@domain/entities/WeatherStatusEntity';

export interface FetchWeatherStatusProps {
  latitude: number;
  longitude: number;
}
export interface FetchWeatherStatus {
  fetch({
    latitude,
    longitude,
  }: FetchWeatherStatusProps): Promise<WeatherStatusEntity>;
}
