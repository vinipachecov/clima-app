import { GetDeviceLocationOnce } from '@data/usecases/GetDeviceLocationOnce';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { UnexpectedError } from '@domain/errors/UnexpectedError';

describe('GetDeviceLocationOnce', () => {
  const getGeolocationOnceSpy = {
    getOnce: jest.fn(),
  };

  let sut: GetDeviceLocationOnce;

  const onSuccessMock = () =>
    getGeolocationOnceSpy.getOnce.mockReturnValue(
      new LocationEntity({
        latitude: 123456,
        longitude: 123456,
      }),
    );
  const onFailMock = () =>
    getGeolocationOnceSpy.getOnce.mockRejectedValueOnce(new UnexpectedError());

  beforeEach(() => {
    jest.clearAllMocks();
    onSuccessMock();
    sut = new GetDeviceLocationOnce(getGeolocationOnceSpy);
  });

  it('Should call getGeolocationOnce', async () => {
    await sut.get();

    expect(getGeolocationOnceSpy.getOnce).toHaveBeenCalled();
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
    await expect(locationPromise).rejects.toThrow(new UnexpectedError());
  });
});
