import { GetDeviceLocationPermission } from '@data/usecases/permissions/GetDeviceLocationPermission';
import { makePermissionAdapter } from '@main/adapters/permissions/PermissionAdapterFactory';

export const makeLocationPermission = () =>
  new GetDeviceLocationPermission(makePermissionAdapter());
