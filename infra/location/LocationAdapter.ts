import { GetGeolocationOnce } from '@data/location/GetGeolocationOnce';
import { DeviceGeolocationModel } from '@data/models/DeviceLocationModel';
import Geolocation from '@react-native-community/geolocation';
import { GPSPermissionDeniedError } from './errors/GPSPermissionDeniedError';

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
        error => {
          if (error.PERMISSION_DENIED) {
            reject(new GPSPermissionDeniedError());
          }
          if (error.message) {
            reject(new Error(error.message));
          }
        },
      );
    });
  }
}
