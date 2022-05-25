import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { DeviceGeolocationModel } from '@data/models/DeviceLocationModel';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { UnexpectedError } from '@domain/errors/UnexpectedError';

export class GetDeviceLocationOnce {
  getGeolocationOnce: GetGeolocationOnce;
  constructor(getGeolocationOnce: GetGeolocationOnce) {
    this.getGeolocationOnce = getGeolocationOnce;
  }

  async get(): Promise<LocationEntity> {
    try {
      const location = await this.getGeolocationOnce.getOnce();
      return DeviceGeolocationModel.toEntity(location);
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
