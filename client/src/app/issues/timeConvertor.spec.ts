import WorkTimeConfig from './workTimeConfig';
import { TimeConvertor, TimeRound } from './timeConvertor';

describe('TimeConvertor', () => {

  const workTimeConfig = new WorkTimeConfig(5, 8);

  it('time 432000 sec should be "3 weeks"', () => {
    const result = TimeConvertor.buildDisplayTime(432000, null, workTimeConfig);
    expect(result).toBe('3 weeks');
  });

  it('time 287880 sec should be "1 weeks 4 days 7 hours 58 minutes"', () => {
    const result = TimeConvertor.buildDisplayTime(287880, TimeRound.Minute, workTimeConfig);
    expect(result).toBe('1 weeks 4 days 7 hours 58 minutes');
  });

  it('time -3600 sec should be "-1 hours"', () => {
    const result = TimeConvertor.buildDisplayTime(-3600, null, workTimeConfig);
    expect(result).toBe('-1 hours');
  });

  it('time 287880 sec should be "1 weeks 4 days" when rounding to day', () => {
    const result = TimeConvertor.buildDisplayTime(287880, TimeRound.Day, workTimeConfig);
    expect(result).toBe('1 weeks 4 days');
  });

  it('time 287880 sec should be "1 weeks" when rounding to week', () => {
    const result = TimeConvertor.buildDisplayTime(287880, TimeRound.Week, workTimeConfig);
    expect(result).toBe('1 weeks');
  });

});
