export interface CheckDevicePermission {
  check(devicePermission: string): Promise<boolean>;
}
