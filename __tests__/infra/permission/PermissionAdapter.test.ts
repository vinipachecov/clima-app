import { UnexpectedError } from '@domain/errors';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from '@domain/usecases/LocationPermission';
import { PermissionAdapter } from '@infra/permission/PermissionAdapter';
import { request, check, PERMISSIONS } from '@mocks/react-native-permissions';
import { PermissionStatus } from 'react-native-permissions';

describe('PermissionAdapter', () => {
  let sut: PermissionAdapter;

  describe('request', () => {
    const mockAndroidRequestSuccess = () =>
      request.mockResolvedValue('granted');
    const mockAndroidRequestFail = () => request.mockResolvedValue('denied');

    beforeEach(() => {
      jest.clearAllMocks();
      sut = new PermissionAdapter();
    });

    it('should return false when requestLocationPermission with IOS platform', async () => {
      const result = await sut.requestLocationPermission('ios');
      expect(result).toBe(false);
    });

    it('should return false permission package returns granted ', async () => {
      mockAndroidRequestSuccess();
      const result = await sut.requestLocationPermission('android');
      expect(result).toBe(true);
    });

    it('should return false when requestLocationPermission with android platform returns denied', async () => {
      mockAndroidRequestFail();
      const result = await sut.requestLocationPermission('android');
      expect(result).toBe(false);
    });
  });

  describe('check', () => {
    const checkPermissionMock = (permission: PermissionStatus = 'granted') =>
      check.mockResolvedValue(permission);

    beforeEach(() => {
      jest.clearAllMocks();
      checkPermissionMock();
      sut = new PermissionAdapter();
    });

    it('should return true when permission was provided', async () => {
      const result = await sut.check(ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION);
      expect(result).toBe(true);
    });

    it('should return false when permission was denied', async () => {
      checkPermissionMock('denied');
      const result = await sut.check(ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION);
      expect(result).toBe(false);
    });

    it('should return false when permission was denied', async () => {
      const promise = sut.check('something else' as ANDROID_PERMISSIONS);
      expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it('should call RN-permission check with location always permission when params provided ', async () => {
      await sut.check(IOS_PERMISSIONS.LOCATION_ALWAYS);
      expect(check).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_ALWAYS);
    });

    it('should call RN-permission check with LOCATION_WHEN_IN_USE when IOS permission LOCATION_WHEN_IN_USE is provided  ', async () => {
      await sut.check(IOS_PERMISSIONS.LOCATION_WHEN_IN_USE);
      expect(check).toHaveBeenCalledWith(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    });

    it('should call check with android location permission when android platform is provided', async () => {
      await sut.check(ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION);
      expect(check).toHaveBeenCalledWith(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    });
  });
});
