import { HttpClient, HttpStatusCode } from '@data/http/HttpClient';
import {
  RemoteWeatherStatusModel,
  RemoteWeatherStatusModelProps,
} from '@data/models/RemoteWeatherStatusModel';
import { AccessDeniedError } from '@domain/errors/AccessDeniedError';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { FetchWeatherStatus } from '@domain/usecases/FetchWeatherStatus';
import { faker } from '@faker-js/faker';

class FetchRemoteWeatherStatus implements FetchWeatherStatus {
  private httpClient: HttpClient<RemoteWeatherStatusModelProps>;
  private url: string;
  constructor(httpClient: HttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  async fetch() {
    try {
      const response = await this.httpClient.request({
        url: this.url,
        method: 'get',
      });
      switch (response.statusCode) {
        case HttpStatusCode.ok:
          return RemoteWeatherStatusModel.toEntity(response.body);
        case HttpStatusCode.Unauthorized:
          throw new AccessDeniedError();
        default:
          throw new UnexpectedError();
      }
    } catch (error) {
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
    await sut.fetch();
    expect(httpClientMock.request).toHaveBeenCalledWith({ url });
  });

  it('Should throw AccessDeniedError if HttpClient returns 401', async () => {
    onFailRequest(HttpStatusCode.Unauthorized);
    const promise = sut.fetch();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw Unexpected if HttpClient returns something else', async () => {
    onFailRequest(HttpStatusCode.BadRequest);
    const promise = sut.fetch();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
