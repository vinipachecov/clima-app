export class GPSPermissionDeniedError extends Error {
  constructor() {
    super('GPS permission denied.');
    this.name = 'GPSPermissionDeniedError';
  }
}
