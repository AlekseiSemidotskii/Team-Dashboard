import WorkTimeConfig from './workTimeConfig';
import TimeConvertor from './timeConvertor';

describe('TimeConvertor', () => {

  const workTimeConfig = new WorkTimeConfig(5, 8);

  it('time 432000 sec should be 3 weeks', () => {
    let result = TimeConvertor.buildDisplayTime(432000, workTimeConfig);
    expect(result).toBe('3 weeks');
  });

  it('time 86400 sec should be 3 days', () => {
    let result = TimeConvertor.buildDisplayTime(86400, workTimeConfig);
    expect(result).toBe('3 days');
  });

});
