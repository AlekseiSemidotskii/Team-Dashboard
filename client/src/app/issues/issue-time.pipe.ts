import { Pipe, PipeTransform } from '@angular/core';
import { TimeConvertor, TimeRound } from './timeConvertor';

@Pipe({name: 'issueTime'})
export class IssueTimePipe implements PipeTransform {
  transform(value: number, roundTo: string): string {
    let timeRoundTo = TimeRound.Minute;
    if (roundTo === 'RoundToDays') {
      timeRoundTo = TimeRound.Day;
    }
    return TimeConvertor.buildDisplayTime(value, timeRoundTo);
  }
}
