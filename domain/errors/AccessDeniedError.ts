export class AccessDeniedError extends Error {
  constructor() {
    super('Unable to access API.');
    this.name = 'AccessDenied';
  }
}
