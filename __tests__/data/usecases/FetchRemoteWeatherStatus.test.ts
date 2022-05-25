import { HttpClient, HttpStatusCode } from '@data/http/HttpClient';
import { AccessDeniedError } from '@domain/errors/AccessDeniedError';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { FetchWeatherStatusProps } from '@domain/usecases/FetchWeatherStatus';
import { faker } from '@faker-js/faker';

class FetchRemoteWeatherStatus {
  private httpClient: HttpClient;
  private url: string;
  constructor(httpClient: HttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  async fetch({ latitude, longitude }: FetchWeatherStatusProps) {
    const response = await this.httpClient.request({
      url: this.url,
    });
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.Unauthorized:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

let sut: FetchRemoteWeatherStatus;

const httpClientMock = {
  request: jest.fn(),
};
const url = faker.internet.url();

const onSuccessRequest = () =>
  httpClientMock.request.mockReturnValue({
    statusCode: HttpStatusCode.ok,
  });

const onFailRequest = (error: HttpStatusCode) =>
  httpClientMock.request.mockReturnValue({
    statusCode: error,
  });

beforeEach(() => {
  onSuccessRequest();
  sut = new FetchRemoteWeatherStatus(httpClientMock, url);
  jest.clearAllMocks();
});

describe('FetchRemoteWeatherStatus', () => {
  it('Should call HttpClient with correct params', async () => {
    await sut.fetch({
      latitude: 123456,
      longitude: 123456,
    });
    expect(httpClientMock.request).toHaveBeenCalledWith({ url });
  });

  it('Should throw AccessDeniedError if HttpClient returns 401', async () => {
    onFailRequest(HttpStatusCode.Unauthorized);
    const promise = sut.fetch({
      latitude: 123456,
      longitude: 123456,
    });
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw Unexpected if HttpClient returns something else', async () => {
    onFailRequest(HttpStatusCode.BadRequest);
    const promise = sut.fetch({
      latitude: 123456,
      longitude: 123456,
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
