export enum WeatherType {
  CLEAR_SKY,
  FEW_CLOUDS,
  SCATTERED_CLOUDS,
  BROKEN_CLOUDS,
  SHOWER_RAIN,
  RAIN,
  THUNDERSTORM,
  SNOW,
  MIST,
}

interface WeatherStatusEntityProps {
  description: string;
  type: WeatherType;
  icon: string;
}

export class WeatherStatusEntity {
  description: string;
  type: WeatherType;
  icon: string;

  constructor({ description, icon, type }: WeatherStatusEntityProps) {
    this.description = description;
    this.type = type;
    this.icon = icon;
  }
}
