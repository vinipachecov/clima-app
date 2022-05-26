import { faker } from '@faker-js/faker';
import { HttpMethod, HttpStatusCode } from '@data/http/HttpClient';
import { FetchHttpClient } from '@infra/http/FetchHttpClient';

const mockRequest = (status: unknown, body = {}) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status,
      json: () => Promise.resolve(body),
    }),
  ) as jest.Mock;
};

describe('HttpAdapter', () => {
  let sut: FetchHttpClient;
  const url = faker.internet.url();
  let method: HttpMethod;
  const fakeHeaders = {
    header: 'header',
  };
  const requestBody = {
    dataId: faker.random.alphaNumeric(12),
  };
  const responseBody = {
    data: 'data',
  };

  beforeEach(() => {
    mockRequest(HttpStatusCode.ok, responseBody);
    sut = new FetchHttpClient();
    method = faker.internet.httpMethod().toLocaleLowerCase();
    jest.clearAllMocks();
  });
  it('Should call fetch with correct params', async () => {
    await sut.request({
      url,
      method,
      headers: fakeHeaders,
      body: requestBody,
    });
    expect(fetch).toHaveBeenCalledWith(url, {
      method,
      body: requestBody,
      headers: fakeHeaders,
    });
  });

  it('Should return body correctly', async () => {
    const response = await sut.request({
      url,
      method,
      headers: fakeHeaders,
      body: requestBody,
    });
    expect(response.body).toEqual(responseBody);
  });

  it('Should return 400 status when fetch returns status 400', async () => {
    mockRequest(HttpStatusCode.BadRequest);
    const response = await sut.request({
      url,
      method,
      headers: fakeHeaders,
      body: requestBody,
    });
    expect(response?.statusCode).toEqual(400);
  });

  it('Should return 401 status when fetch returns status 401', async () => {
    mockRequest(HttpStatusCode.Unauthorized);
    const response = await sut.request({
      url,
      method,
      body: requestBody,
      headers: fakeHeaders,
    });
    expect(response?.statusCode).toEqual(401);
  });

  it('Should return 500 status when fetch returns status 500', async () => {
    mockRequest(HttpStatusCode.ServerError);
    const response = await sut.request({
      url,
      method,
      body: requestBody,
      headers: fakeHeaders,
    });
    expect(response?.statusCode).toEqual(500);
  });
});
