import { GeolocationAdapter } from '@infra/location/LocationAdapter';

export const makeLocationAdapterFactory = () => {
  return new GeolocationAdapter();
};
