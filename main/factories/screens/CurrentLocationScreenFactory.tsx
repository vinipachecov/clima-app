import React from 'react';
import CurrentLocationScreen from '@ui/screens/CurrentLocationScreen';
import { NavigationProp } from '@react-navigation/native';
import { makeFetchRemoteWeatherStatus } from '../usecases/weatherApi/FetchRemoteWeatherStatusFactory';
import { makeGetDeviceLocationOnce } from '../usecases/location/GetDeviceLocationOnceFactory';
import { makeLocationPermission } from '../permissions/LocationPermissionFactory';
import { makeCheckPermission } from '../permissions/CheckPermissionFactory';

export const CurrentLocationScreenFactory = (parentProps: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <CurrentLocationScreen
      {...parentProps}
      fetchWeatherStatus={makeFetchRemoteWeatherStatus()}
      gpsLocation={makeGetDeviceLocationOnce()}
      locationPermission={makeLocationPermission()}
      permissionChecker={makeCheckPermission()}
    />
  );
};
