import * as yup from 'yup';
import { WeatherStatusEntity } from '@domain/entities/WeatherStatusEntity';
import { UnexpectedError } from '@domain/errors/UnexpectedError';
import { env } from '@main/config/sandbox.env';

const RemoteWeatherStatusModelValidator = yup.object({
  name: yup.string().required(),
  weather: yup.array().of(
    yup.object({
      id: yup.number(),
      main: yup.string().required(),
      description: yup.string().required(),
      icon: yup.string().required(),
    }),
  ),
  main: yup.object({
    temp: yup.number(),
  }),
});

export type RemoteWeatherStatusModelProps = {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
};
export class RemoteWeatherStatusModel {
  static async toEntity(model?: RemoteWeatherStatusModelProps) {
    const isValid = await RemoteWeatherStatusModelValidator.isValidSync(model);
    if (isValid) {
      return new WeatherStatusEntity({
        description: model!.weather[0].description,
        type: model!.weather[0].main,
        city: model!.name,
        icon: `${env.weatherImageAPI}${model!.weather[0].icon}@2x.png`,
        temperature: model!.main.temp,
      });
    } else {
      throw new UnexpectedError();
    }
  }
}
