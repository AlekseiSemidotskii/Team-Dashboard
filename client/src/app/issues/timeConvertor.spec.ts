import WorkTimeConfig from './workTimeConfig';
import TimeConvertor from './timeConvertor';

describe('TimeConvertor', () => {

  const workTimeConfig = new WorkTimeConfig(5, 8);

  it('time 432000 sec should be 3 weeks', () => {
    const result = TimeConvertor.buildDisplayTime(432000, workTimeConfig);
    expect(result).toBe('3 weeks');
  });

  it('time 86400 sec should be 3 days', () => {
    const result = TimeConvertor.buildDisplayTime(86400, workTimeConfig);
    expect(result).toBe('3 days');
  });

  it('time -3600 sec should be -1 hours', () => {
    const result = TimeConvertor.buildDisplayTime(-3600, workTimeConfig);
    expect(result).toBe('-1 hours');
  });

});
