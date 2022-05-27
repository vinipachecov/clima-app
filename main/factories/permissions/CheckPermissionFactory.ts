import { DevicePermissionCheck } from '@data/usecases/permissions/CheckDevicePermission';
import { PermissionAdapter } from '@infra/permission/PermissionAdapter';

export const makeCheckPermission = () =>
  new DevicePermissionCheck(new PermissionAdapter());
