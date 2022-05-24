import { DeviceGeolocationModel } from '../models/DeviceLocationModel';

export interface GetGeolocationOnce {
  get(): Promise<DeviceGeolocationModel>;
}
