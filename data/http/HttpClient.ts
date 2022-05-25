interface RequestProps {
  url: string;
  headers?: {
    [key: string]: string;
  };
  body?: {
    [key: string]: unknown;
  };
}

export interface HttpClient {
  request({ url, headers, body }: RequestProps): Promise<unknown>;
}
