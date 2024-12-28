import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    if (typeof value !== 'number' || value < 0) {
      return 'Invalid duration';
    }

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    const hoursString = hours > 0 ? `${hours}sa ` : '';
    const minutesString = minutes > 0 ? `${minutes}dk ` : '';
    const secondsString = seconds > 0 ? `${seconds}sn` : '';

    return `${hoursString}${minutesString}${secondsString}`.trim();
  }
}
