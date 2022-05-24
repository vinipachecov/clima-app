import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { LocationEntity } from '@domain/entities/LocationEntity';

export class GetDeviceLocationOnce {
  getGeolocationOnce: GetGeolocationOnce;
  constructor(getGeolocationOnce: GetGeolocationOnce) {
    this.getGeolocationOnce = getGeolocationOnce;
  }
  async get(): Promise<LocationEntity> {
    const location = await this.getGeolocationOnce.get();
    return location;
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
});
