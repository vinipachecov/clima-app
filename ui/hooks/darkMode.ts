import { Appearance } from 'react-native';

export function useAppearence() {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme;
}
