import { DevicePermission } from './LocationPermission';

export interface CheckPermission {
  check(permission: DevicePermission): Promise<boolean>;
}
