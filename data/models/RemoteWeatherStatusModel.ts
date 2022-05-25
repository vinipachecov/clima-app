import joi from 'joi';
import { WeatherStatusEntity } from '@domain/entities/WeatherStatusEntity';
import { UnexpectedError } from '@domain/errors/UnexpectedError';

const RemoteWeatherStatusModelValidator = joi.object({
  name: joi.string().required(),
  weather: {
    main: joi.string().required(),
    description: joi.string().required(),
    icon: joi.string().required(),
  },
});

export type RemoteWeatherStatusModelProps = {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
};
export class RemoteWeatherStatusModel {
  static toEntity(model?: RemoteWeatherStatusModelProps) {
    RemoteWeatherStatusModelValidator.validate(model);
    if (RemoteWeatherStatusModelValidator.valid()) {
      return new WeatherStatusEntity({
        description: model!.weather.description,
        type: model!.weather.main,
        city: model!.name,
        icon: model!.weather.icon,
      });
    } else {
      throw new UnexpectedError();
    }
  }
}
