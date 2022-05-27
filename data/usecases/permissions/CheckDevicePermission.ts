import { CheckDevicePermission } from '@data/permissions/CheckDevicePermission';
import { CheckPermission } from '@domain/usecases/CheckPermission';
import { DevicePermission } from '@domain/usecases/LocationPermission';

export class DevicePermissionCheck implements CheckPermission {
  constructor(private permissionChecker: CheckDevicePermission) {
    this.permissionChecker = permissionChecker;
  }
  check(permission: DevicePermission): Promise<boolean> {
    return this.permissionChecker.check(permission);
  }
}
