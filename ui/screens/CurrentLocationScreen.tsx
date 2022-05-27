import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  View,
  Button,
  ActivityIndicator,
  Platform,
  Linking,
  Alert,
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
import { GetDeviceLocationPermission } from '@data/usecases/permissions/GetDeviceLocationPermission';
import { CheckPermission } from '@domain/usecases/CheckPermission';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from '@domain/usecases/LocationPermission';

type CurrentLocationScreenProps = {
  gpsLocation: GetCurrentDeviceLocation;
  fetchWeatherStatus: FetchWeatherStatus;
  navigation: NavigationProp<any>;
  locationPermission: GetDeviceLocationPermission;
  permissionChecker: CheckPermission;
};

function CurrentLocationScreen({
  fetchWeatherStatus,
  gpsLocation,
  locationPermission,
  permissionChecker,
}: CurrentLocationScreenProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationEntity>();
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatusEntity>();
  const [loading, setLoading] = useState(false);
  const [gpsDenied, setGpsDenied] = useState(false);

  const getLocation = useCallback(async () => {
    try {
      const position = await gpsLocation.get();
      setCurrentLocation(position);
    } catch (error) {
      if (error instanceof GPSPermissionDeniedError) {
        setGpsDenied(true);
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

  const requestGPSPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const isPermissionGranted = await permissionChecker.check(
        IOS_PERMISSIONS.LOCATION_WHEN_IN_USE,
      );
      if (isPermissionGranted) {
        setGpsDenied(false);
        getLocation();
      } else {
        Linking.openURL('App-Prefs:LOCATION_SERVICES');
      }
    } else {
      const androidGPSpermission = await permissionChecker.check(
        ANDROID_PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (androidGPSpermission) {
        setGpsDenied(false);
        await getLocation();
      } else {
        const permissionProvided = await locationPermission.request('android');
        if (!permissionProvided) {
          Alert.alert(
            'GPS permission still denied',
            'Go to settings to change?',
            [
              {
                text: 'Yes',
                onPress: () => {
                  Linking.sendIntent(
                    'android.settings.LOCATION_SOURCE_SETTINGS',
                  );
                },
              },
              {
                text: 'No',
              },
            ],
          );
        }
      }
    }
  }, [setGpsDenied, getLocation, permissionChecker, locationPermission]);

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
          {gpsDenied && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                Enable location access to the app.
              </Text>
              <Button
                title="Request location permission"
                onPress={requestGPSPermission}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default CurrentLocationScreen;
