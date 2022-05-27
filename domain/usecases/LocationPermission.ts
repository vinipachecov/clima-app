export enum IOS_PERMISSIONS {
  LOCATION_WHEN_IN_USE = 'location-when-in-use',
  LOCATION_ALWAYS = 'location-always',
}

export enum ANDROID_PERMISSIONS {
  ACCESS_FINE_LOCATION = 'access-fine-location',
}

export type DevicePermission = IOS_PERMISSIONS | ANDROID_PERMISSIONS;

export interface LocationPermission {
  request(plaform: string): Promise<boolean>;
}
