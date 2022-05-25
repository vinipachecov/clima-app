import { HttpClient } from '@data/http/HttpClient';
import { HttpError } from '@data/http/HttpError';
import { AccessDeniedError } from '@domain/errors/AccessDeniedError';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { DomainError } from '@domain/helpers/DomainError';
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
    try {
      await this.httpClient.request({
        url: this.url,
      });
      return null;
    } catch (error) {
      if (error === HttpError.Unauthorized) {
        throw new AccessDeniedError();
      } else {
        throw new UnexpectedError();
      }
    }
  }
}

let sut: FetchRemoteWeatherStatus;

const httpClientMock = {
  request: jest.fn(),
};
const url = faker.internet.url();

const onFailRequest = (error: HttpError) =>
  httpClientMock.request.mockRejectedValueOnce(error);

beforeEach(() => {
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
    onFailRequest(HttpError.Unauthorized);
    const promise = sut.fetch({
      latitude: 123456,
      longitude: 123456,
    });
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw Unexpected if HttpClient returns something else', async () => {
    onFailRequest(HttpError.BadRequest);
    const promise = sut.fetch({
      latitude: 123456,
      longitude: 123456,
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
