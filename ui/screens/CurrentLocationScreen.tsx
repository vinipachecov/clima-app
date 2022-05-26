import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FetchWeatherStatus } from '@domain/usecases/FetchWeatherStatus';
import { GetCurrentDeviceLocation } from '@domain/usecases/GetCurrentDeviceLocation';
import { LocationEntity } from '@domain/entities/LocationEntity';
import { WeatherStatusEntity } from '@domain/entities/WeatherStatusEntity';
import LightBackground from '@res/images/light_background.png';
import DarkBackground from '@res/images/dark_background.png';
import { useAppearence } from '@ui/hooks/darkMode';
import { GPSPermissionDeniedError } from '@infra/location/errors/GPSPermissionDeniedError';

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
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(async () => {
    try {
      const position = await gpsLocation.get();
      setCurrentLocation(position);
    } catch (error) {
      if (error instanceof GPSPermissionDeniedError) {
        Toast.show({
          type: 'error',
          text1: 'An error occured',
          text2: error.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An error occured',
          text2: 'Unable to get GPS location.',
        });
      }
    }
  }, [gpsLocation, setCurrentLocation]);

  const requestRemoteWeatherStatus = useCallback(async () => {
    if (currentLocation) {
      try {
        setLoading(true);
        const data = await fetchWeatherStatus.fetch({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        });
        setLoading(false);
        setWeatherStatus(data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'An error occured',
          text2: 'Unable to fetch Weather data.',
        });
      }
    }
  }, [currentLocation, fetchWeatherStatus, setLoading]);

  useEffect(() => {
    getLocation();
  }, [getLocation, setCurrentLocation, gpsLocation]);

  useEffect(() => {
    requestRemoteWeatherStatus();
  }, [currentLocation, requestRemoteWeatherStatus]);
  const colorMode = useAppearence();
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      resizeMode="cover"
      source={colorMode === 'light' ? LightBackground : DarkBackground}>
      <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
        <View
          style={{
            flex: 1,
            padding: 16,
          }}>
          {weatherStatus && (
            <>
              <Text style={{ fontSize: 35, textAlign: 'center' }}>
                {weatherStatus.city}
              </Text>
              <Text style={{ fontSize: 30, textAlign: 'center' }}>
                {weatherStatus.temperature.toFixed(0)}º
              </Text>

              <Image
                style={{ height: 100, width: 100, alignSelf: 'center' }}
                resizeMode="contain"
                resizeMethod="auto"
                source={{ uri: weatherStatus.icon }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  marginTop: 10,
                  marginBottom: 30,
                }}>
                {weatherStatus.description}
              </Text>

              {!loading ? (
                <Button
                  onPress={requestRemoteWeatherStatus}
                  title="Request Weather Data"
                />
              ) : (
                <ActivityIndicator testID="loading-indicator" size="large" />
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default CurrentLocationScreen;
