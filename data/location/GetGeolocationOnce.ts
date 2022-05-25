import { DeviceGeolocationModel } from '../models/DeviceLocationModel';

export interface GetGeolocationOnce {
  getOnce(): Promise<DeviceGeolocationModel>;
}
