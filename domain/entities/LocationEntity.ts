interface LocationEntityProps {
  latitude: string;
  longitude: string;
}

export class LocationEntity {
  latitude: string;
  longitude: string;
  constructor({ latitude, longitude }: LocationEntityProps) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
