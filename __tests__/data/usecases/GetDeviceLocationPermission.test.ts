import { GetDeviceLocationPermission } from '@data/usecases/GetDeviceLocationPermission';
import { UnexpectedError } from '@domain/errors';
import { faker } from '@faker-js/faker';

describe('GetDeviceLocationPermission', () => {
  let sut: GetDeviceLocationPermission;
  let platform = '';
  const permissionRequest = {
    requestLocationPermission: jest.fn(),
  };

  const onPermissionGranted = () =>
    permissionRequest.requestLocationPermission.mockReturnValue(true);

  const onPermissionDenied = () =>
    permissionRequest.requestLocationPermission.mockReturnValue(false);

  const onPermissionThrowed = () =>
    permissionRequest.requestLocationPermission.mockRejectedValue(new Error());

  beforeEach(() => {
    onPermissionGranted();
    sut = new GetDeviceLocationPermission(permissionRequest);
    platform = faker.random.word();
  });

  it('Should return true when requestLocationPermission returns true', async () => {
    const result = await sut.request(platform);
    expect(result).toEqual(true);
  });

  it('Should return false when requestLocationPermission returns false', async () => {
    onPermissionDenied();
    const result = await sut.request(platform);
    expect(result).toEqual(false);
  });

  it('Should throw UnexpectedError when requestLocationPermission throws', async () => {
    onPermissionThrowed();
    const promise = sut.request(platform);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
