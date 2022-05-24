interface LocationEntityProps {
  latitude: number;
  longitude: number;
}

export class LocationEntity {
  latitude: number;
  longitude: number;
  constructor({ latitude, longitude }: LocationEntityProps) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
