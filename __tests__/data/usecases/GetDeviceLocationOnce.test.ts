import { GetGeolocationOnce } from '../../../data/location/GetGeolocationOnce';

export class GetDeviceLocationOnce {
  getGeolocationOnce: GetGeolocationOnce;
  constructor(getGeolocationOnce: GetGeolocationOnce) {
    this.getGeolocationOnce = getGeolocationOnce;
  }
  get() {
    this.getGeolocationOnce.get();
    return null;
  }
}

describe('GetDeviceLocationOnce', () => {
  const getGeolocationOnceSpy = {
    get: jest.fn(),
  };

  it('Should call getGeolocationOnce', async () => {
    const sut = new GetDeviceLocationOnce(getGeolocationOnceSpy);
    await sut.get();

    expect(getGeolocationOnceSpy.get).toHaveBeenCalled();
  });
});
