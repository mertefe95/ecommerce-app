import { SuccessDto } from '../dto';

export default function (message: string, data?: object): SuccessDto {
  return { message, ...data };
}
