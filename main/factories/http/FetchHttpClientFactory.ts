import { FetchHttpClient } from '@infra/http/FetchHttpClient';

export const makeFetchHttpClient = (): FetchHttpClient => new FetchHttpClient();
