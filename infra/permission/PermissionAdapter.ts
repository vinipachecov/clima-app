import { CheckDevicePermission } from '@data/permissions/CheckDevicePermission';
import { RequestLocationPermission } from '@data/permissions/RequestLocationPermission';
import { UnexpectedError } from '@domain/errors';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from '@domain/usecases/LocationPermission';
import {
  check as checkPermission,
  Permission,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export class PermissionAdapter
  implements RequestLocationPermission, CheckDevicePermission
{
  async requestLocationPermission(platform: string): Promise<boolean> {
    if (platform === 'ios') {
      return Promise.resolve(false);
    } else {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return false;
    }
  }

  async check(
    devicePermission: ANDROID_PERMISSIONS | IOS_PERMISSIONS,
  ): Promise<boolean> {
    let permissionToCheck: Permission;
    switch (devicePermission) {
      case IOS_PERMISSIONS.LOCATION_ALWAYS:
        permissionToCheck = PERMISSIONS.IOS.LOCATION_ALWAYS;
        break;
      case IOS_PERMISSIONS.LOCATION_WHEN_IN_USE:
        permissionToCheck = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        break;
      case ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION:
        permissionToCheck = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        break;
      default:
        throw new UnexpectedError();
    }
    const permissionCheckResult = await checkPermission(permissionToCheck);
    if (permissionCheckResult === RESULTS.GRANTED) {
      return true;
    }
    return false;
  }
}
