import { RequestLocationPermission } from '@data/permissions/RequestLocationPermission';
import { UnexpectedError } from '@domain/errors';
import { LocationPermission } from '@domain/usecases/LocationPermission';

export class GetDeviceLocationPermission implements LocationPermission {
  constructor(private permissionRequest: RequestLocationPermission) {
    this.permissionRequest = permissionRequest;
  }
  async request(platform: string): Promise<boolean> {
    try {
      const result = await this.permissionRequest.requestLocationPermission(
        platform,
      );
      return result;
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
