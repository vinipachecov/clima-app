import { ANDROID_PERMISSIONS } from '@domain/usecases/LocationPermission';
import { PermissionAdapter } from '@infra/permission/PermissionAdapter';
import { request, check } from '@mocks/react-native-permissions';
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

    it('should return true when check returns granted ', async () => {
      const result = await sut.check(ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION);
      expect(result).toBe(true);
    });

    it('should return false when check returns denied ', async () => {
      checkPermissionMock('denied');
      const result = await sut.check(ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION);
      expect(result).toBe(false);
    });
  });
});
