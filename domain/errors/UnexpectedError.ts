export class UnexpectedError extends Error {
  constructor() {
    super('An unexpected error occured. Please try again later.');
    this.name = 'UnexpectedError';
  }
}
