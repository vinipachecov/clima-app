interface DeviceGeolocationModelProps {
  latitude: number;
  longitude: number;
}

export class DeviceGeolocationModel {
  latitude: number;
  longitude: number;
  constructor({ latitude, longitude }: DeviceGeolocationModelProps) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
