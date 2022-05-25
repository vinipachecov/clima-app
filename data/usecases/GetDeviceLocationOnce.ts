import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { DomainError } from '@domain/helpers/DomainError';

export class GetDeviceLocationOnce {
  getGeolocationOnce: GetGeolocationOnce;
  constructor(getGeolocationOnce: GetGeolocationOnce) {
    this.getGeolocationOnce = getGeolocationOnce;
  }

  async get(): Promise<LocationEntity> {
    try {
      const location = await this.getGeolocationOnce.getOnce();
      return location;
    } catch (error) {
      throw DomainError.unexpected;
    }
  }
}
