import { GetDeviceLocationOnce } from '@data/usecases/GetDeviceLocationOnce';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { DomainError } from '@domain/helpers/DomainError';

describe('GetDeviceLocationOnce', () => {
  const getGeolocationOnceSpy = {
    get: jest.fn(),
  };

  let sut: GetDeviceLocationOnce;

  const onSuccessMock = () =>
    getGeolocationOnceSpy.get.mockReturnValue(
      new LocationEntity({
        latitude: 123456,
        longitude: 123456,
      }),
    );
  const onFailMock = () =>
    getGeolocationOnceSpy.get.mockRejectedValueOnce(new Error());

  beforeEach(() => {
    jest.clearAllMocks();
    onSuccessMock();
    sut = new GetDeviceLocationOnce(getGeolocationOnceSpy);
  });

  it('Should call getGeolocationOnce', async () => {
    await sut.get();

    expect(getGeolocationOnceSpy.get).toHaveBeenCalled();
  });

  it('Should return a LocationEntity when succeeds', async () => {
    const location = await sut.get();

    expect(location).not.toBeNull();
    expect(location).toMatchObject(
      new LocationEntity({
        latitude: 123456,
        longitude: 123456,
      }),
    );
  });

  it('Should throw an Unexpected error when GetGeolocationOnce fails', async () => {
    onFailMock();
    const locationPromise = sut.get();
    expect(locationPromise).rejects.toThrow(DomainError.unexpected);
  });
});
