import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { DeviceGeolocationModel } from '@data/models/DeviceLocationModel';
import Geolocation from '@react-native-community/geolocation';

export class GeolocationAdapter implements GetGeolocationOnce {
  getOnce(): Promise<DeviceGeolocationModel> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(
            new DeviceGeolocationModel({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
        },
        error => reject(error),
      );
    });
  }
}
