import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { DeviceGeolocationModel } from '@data/models/DeviceLocationModel';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { GPSPermissionDeniedError } from '@infra/location/errors/GPSPermissionDeniedError';

export class GetDeviceLocationOnce {
  constructor(private geolocationRequest: GetGeolocationOnce) {
    this.geolocationRequest = geolocationRequest;
  }

  async get(): Promise<LocationEntity> {
    try {
      const location = await this.geolocationRequest.getOnce();
      return DeviceGeolocationModel.toEntity(location);
    } catch (error) {
      if (error instanceof GPSPermissionDeniedError) {
        throw error;
      } else {
        throw new UnexpectedError();
      }
    }
  }
}
