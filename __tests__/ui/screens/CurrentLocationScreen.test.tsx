import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CurrentLocationScreen from '@ui/screens/CurrentLocationScreen';
import { faker } from '@faker-js/faker';
import { act } from 'react-test-renderer';
import { NavigationProp } from '@react-navigation/native';

describe('CurrentLocationScreen', () => {
  const gpsLocation = {
    get: jest.fn(() =>
      Promise.resolve({
        latitude: parseInt(faker.random.numeric(15)),
        longitude: parseInt(faker.random.numeric(15)),
      }),
    ),
  };
  const fetchWeatherStatus = {
    fetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call usecases after component rendered', async () => {
    const {} = render(
      <CurrentLocationScreen
        navigation={{} as NavigationProp<any>}
        fetchWeatherStatus={fetchWeatherStatus}
        gpsLocation={gpsLocation}
      />,
    );

    await waitFor(() => expect(gpsLocation.get).toHaveBeenCalled());
    act(() => {
      expect(fetchWeatherStatus.fetch).toHaveBeenCalled();
    });
  });
});
