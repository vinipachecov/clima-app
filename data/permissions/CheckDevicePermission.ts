export interface CheckDevicePermission {
  check(platform: string, devicePermission: string): Promise<boolean>;
}
