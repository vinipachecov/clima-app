import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { DomainError } from '@domain/helpers/DomainError';

export class GetDeviceLocationOnce {
  getGeolocationOnce: GetGeolocationOnce;
  constructor(getGeolocationOnce: GetGeolocationOnce) {
    this.getGeolocationOnce = getGeolocationOnce;
  }
  async get(): Promise<LocationEntity> {
    try {
      const location = await this.getGeolocationOnce.get();
      return location;
    } catch (error) {
      throw DomainError.unexpected;
    }
  }
}

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
