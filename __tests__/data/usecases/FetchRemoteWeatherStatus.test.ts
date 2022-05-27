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
const latitude = parseInt(faker.random.numeric(30), 10);
const longitude = parseInt(faker.random.numeric(30), 10);

const onSuccessRequest = () =>
  httpClientMock.request.mockReturnValue({
    statusCode: HttpStatusCode.ok,
    body: {
      name: faker.random.words(),
      weather: [
        {
          main: faker.random.words(),
          description: faker.random.words(3),
          icon: faker.random.words(),
        },
      ],
      main: {
        temp: faker.random.numeric(2),
      },
    },
  });

const onIncompleteDataRequest = () =>
  httpClientMock.request.mockReturnValue({
    statusCode: HttpStatusCode.ok,
    body: {
      name: faker.random.words(),
      weather: {
        main: faker.random.words(),
      },
    },
  });

const onFailRequest = (error: HttpStatusCode) =>
  httpClientMock.request.mockReturnValue({
    statusCode: error,
  });

beforeEach(() => {
  jest.clearAllMocks();
  onSuccessRequest();
  sut = new FetchRemoteWeatherStatus(httpClientMock, url);
});

describe('FetchRemoteWeatherStatus', () => {
  it('Should call HttpClient with correct params', async () => {
    await sut.fetch({
      latitude,
      longitude,
    });
    expect(httpClientMock.request).toHaveBeenCalledWith({
      url: `${url}&lat=${latitude}&lon=${longitude}&units=metric`,
      method: 'get',
    });
  });

  it('Should throw AccessDeniedError if HttpClient returns 401', async () => {
    onFailRequest(HttpStatusCode.Unauthorized);
    const promise = sut.fetch({
      latitude,
      longitude,
    });
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw Unexpected if HttpClient returns something else', async () => {
    onFailRequest(HttpStatusCode.BadRequest);
    const promise = sut.fetch({
      latitude,
      longitude,
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw Unexpected if HttpClient returns incomplete data', async () => {
    onIncompleteDataRequest();
    const promise = sut.fetch({
      latitude,
      longitude,
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
