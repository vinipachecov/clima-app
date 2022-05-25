import { LocationEntity } from '@domain/entities/LocationEntity';

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

  static toEntity = (
    deviceGeolocation: DeviceGeolocationModel,
  ): LocationEntity => {
    return new LocationEntity({
      latitude: deviceGeolocation.latitude,
      longitude: deviceGeolocation.longitude,
    });
  };
}
