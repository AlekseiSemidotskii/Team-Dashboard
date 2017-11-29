import { Pipe, PipeTransform } from '@angular/core';
import TimeConvertor from './timeConvertor';

@Pipe({name: 'issueTime'})
export class IssueTimePipe implements PipeTransform {
  transform(value: number): string {
    return TimeConvertor.buildDisplayTime(value);
  }
}
