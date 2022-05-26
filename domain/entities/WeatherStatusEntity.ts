interface WeatherStatusEntityProps {
  description: string;
  type: string;
  icon: string;
  city: string;
  temperature: number;
}

export class WeatherStatusEntity {
  description: string;
  type: string;
  icon: string;
  city: string;
  temperature: number;

  constructor({
    description,
    icon,
    type,
    city,
    temperature,
  }: WeatherStatusEntityProps) {
    this.description = description;
    this.type = type;
    this.icon = icon;
    this.city = city;
    this.temperature = temperature;
  }
}
