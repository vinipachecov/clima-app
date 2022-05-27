import { GetDeviceLocationOnce } from '@data/usecases/location/GetDeviceLocationOnce';
import { makeLocationAdapterFactory } from '@main/adapters/LocationAdapterFactory';

export const makeGetDeviceLocationOnce = () =>
  new GetDeviceLocationOnce(makeLocationAdapterFactory());
