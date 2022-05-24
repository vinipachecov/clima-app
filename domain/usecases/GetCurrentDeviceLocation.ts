import { LocationEntity } from '../entities/LocationEntity';

export interface GetCurrentDeviceLocation {
  get(latitude: number, longitude: number): Promise<LocationEntity>;
}
