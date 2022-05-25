interface WeatherStatusEntityProps {
  description: string;
  type: string;
  icon: string;
  city: string;
}

export class WeatherStatusEntity {
  description: string;
  type: string;
  icon: string;
  city: string;

  constructor({ description, icon, type, city }: WeatherStatusEntityProps) {
    this.description = description;
    this.type = type;
    this.icon = icon;
    this.city = city;
  }
}
