import React, { useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FetchWeatherStatus } from '@domain/usecases/FetchWeatherStatus';
import { GetCurrentDeviceLocation } from '@domain/usecases/GetCurrentDeviceLocation';
import { NavigationProp } from '@react-navigation/native';
import { LocationEntity } from '@domain/entities/LocationEntity';

import { WeatherStatusEntity } from '@domain/entities/WeatherStatusEntity';
import { Image } from 'react-native';

type CurrentLocationScreenProps = {
  gpsLocation: GetCurrentDeviceLocation;
  fetchWeatherStatus: FetchWeatherStatus;
  navigation: NavigationProp<any>;
};

function CurrentLocationScreen({
  fetchWeatherStatus,
  gpsLocation,
}: CurrentLocationScreenProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationEntity>();
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatusEntity>();

  const getLocation = useCallback(async () => {
    const position = await gpsLocation.get();
    setCurrentLocation(position);
  }, [gpsLocation, setCurrentLocation]);

  const requestRemoteWeatherStatus = useCallback(async () => {
    if (currentLocation) {
      const data = await fetchWeatherStatus.fetch({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
      setWeatherStatus(data);
    }
  }, [currentLocation, fetchWeatherStatus]);

  useEffect(() => {
    getLocation();
  }, [getLocation, setCurrentLocation, gpsLocation]);

  useEffect(() => {
    requestRemoteWeatherStatus();
  }, [currentLocation, requestRemoteWeatherStatus]);
  console.log(weatherStatus);
  return (
    <View>
      <Text>Location</Text>
      {currentLocation && <Text>{JSON.stringify(currentLocation)}</Text>}
      {weatherStatus && (
        <>
          <Text>{JSON.stringify(weatherStatus)}</Text>
          <Image
            style={{ height: 80, width: 80 }}
            resizeMode="contain"
            resizeMethod="auto"
            source={{ uri: weatherStatus.icon }}
          />
        </>
      )}
    </View>
  );
}

export default CurrentLocationScreen;
