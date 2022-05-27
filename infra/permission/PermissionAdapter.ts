import { CheckDevicePermission } from '@data/permissions/CheckDevicePermission';
import { RequestLocationPermission } from '@data/permissions/RequestLocationPermission';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from '@domain/usecases/LocationPermission';
import {
  check as checkPermission,
  Permission,
  PERMISSIONS,
  request,
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
      return result === RESULTS.GRANTED;
    }
  }

  async check(
    platform: string,
    devicePermission: ANDROID_PERMISSIONS | IOS_PERMISSIONS,
  ): Promise<boolean> {
    let permissionToCheck: Permission;
    if (platform === 'ios') {
      switch (devicePermission) {
        case IOS_PERMISSIONS.LOCATION_ALWAYS:
          permissionToCheck = PERMISSIONS.IOS.LOCATION_ALWAYS;
          break;
        case IOS_PERMISSIONS.LOCATION_WHEN_IN_USE:
          permissionToCheck = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
          break;
        default:
          permissionToCheck = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
          break;
      }
    } else {
      switch (devicePermission) {
        case ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION:
          permissionToCheck = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          break;
        default:
          permissionToCheck = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          break;
      }
    }
    const permissionCheckResult = await checkPermission(permissionToCheck);
    if (permissionCheckResult === RESULTS.GRANTED) {
      return true;
    }
    return false;
  }
}
