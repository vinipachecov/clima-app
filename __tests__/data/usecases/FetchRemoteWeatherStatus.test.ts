import { faker } from '@faker-js/faker';
import { AccessDeniedError } from '@domain/errors/AccessDeniedError';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { HttpStatusCode } from '@data/http/HttpClient';
import { FetchRemoteWeatherStatus } from '@data/usecases/FetchRemoteWeatherStatus';

let sut: FetchRemoteWeatherStatus;

const httpClientMock = {
  request: jest.fn(),
};
const url = faker.internet.url();

const onSuccessRequest = () =>
  httpClientMock.request.mockReturnValue({
    statusCode: HttpStatusCode.ok,
    body: {
      name: faker.random.words(),
      weather: {
        main: faker.random.words(),
        description: faker.random.words(3),
        icon: faker.random.words(),
      },
    },
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

describe.only('FetchRemoteWeatherStatus', () => {
  it.only('Should call HttpClient with correct params', async () => {
    await sut.fetch();
    expect(httpClientMock.request).toHaveBeenCalledWith({ url, method: 'get' });
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
