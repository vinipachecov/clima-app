export interface RequestLocationPermission {
  requestLocationPermission(platform: string): Promise<boolean>;
}
