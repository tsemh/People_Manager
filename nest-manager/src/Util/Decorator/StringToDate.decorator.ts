import { Transform } from 'class-transformer';

export function StringToDate(): PropertyDecorator {
  return Transform(({ value }) => new Date(value));
}
