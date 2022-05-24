import { LocationEntity } from '../entities/LocationEntity';

export interface GetCurrentDeviceLocation {
  get(): Promise<LocationEntity>;
}
