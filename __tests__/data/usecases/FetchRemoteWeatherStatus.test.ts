import { HttpClient } from '@data/http/HttpClient';
import { FetchWeatherStatusProps } from '@domain/usecases/FetchWeatherStatus';
import { faker } from '@faker-js/faker';

class FetchRemoteWeatherStatus {
  private httpClient: HttpClient;
  private url: string;
  constructor(httpClient: HttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  fetch({ latitude, longitude }: FetchWeatherStatusProps) {
    this.httpClient.request({
      url: this.url,
    });
    return null;
  }
}

let sut: FetchRemoteWeatherStatus;

const httpClientMock = {
  request: jest.fn(),
};
const url = faker.internet.url();

beforeEach(() => {
  sut = new FetchRemoteWeatherStatus(httpClientMock, url);
});

describe('FetchRemoteWeatherStatus', () => {
  it('Should call HttpClient with correct params', async () => {
    await sut.fetch({
      latitude: 123456,
      longitude: 123456,
    });
    expect(httpClientMock.request).toHaveBeenCalledWith({ url });
  });
});
