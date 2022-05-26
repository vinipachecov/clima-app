import joi from 'joi';
import { WeatherStatusEntity } from '@domain/entities/WeatherStatusEntity';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { env } from '@main/config/sandbox.env';

const RemoteWeatherStatusModelValidator = joi.object({
  name: joi.string().required(),
  weather: joi.array().items(
    joi.object({
      id: joi.number(),
      main: joi.string().required(),
      description: joi.string().required(),
      icon: joi.string().required(),
    }),
  ),
});

export type RemoteWeatherStatusModelProps = {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};
export class RemoteWeatherStatusModel {
  static toEntity(model?: RemoteWeatherStatusModelProps) {
    const isValid = RemoteWeatherStatusModelValidator.validate(model, {
      allowUnknown: true,
    });
    if (!isValid.error) {
      return new WeatherStatusEntity({
        description: model!.weather[0].description,
        type: model!.weather[0].main,
        city: model!.name,
        icon: `${env.weatherImageAPI}${model!.weather[0].icon}@2x.png`,
      });
    } else {
      throw new UnexpectedError();
    }
  }
}
