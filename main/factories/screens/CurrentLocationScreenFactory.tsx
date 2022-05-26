import React from 'react';
import CurrentLocationScreen from '@ui/screens/CurrentLocationScreen';
import { NavigationProp } from '@react-navigation/native';
import { makeFetchRemoteWeatherStatus } from '../usecases/weatherApi/FetchRemoteWeatherStatusFactory';
import { makeGetDeviceLocationOnce } from '../usecases/location/GetDeviceLocationOnceFactory';

export const CurrentLocationScreenFactory = (parentProps: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <CurrentLocationScreen
      {...parentProps}
      fetchWeatherStatus={makeFetchRemoteWeatherStatus()}
      gpsLocation={makeGetDeviceLocationOnce()}
    />
  );
};
