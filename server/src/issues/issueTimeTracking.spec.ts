import { IssueTimeTracking, WorkTimeConfig } from './issueTimeTracking';
import { expect } from 'chai';
import 'mocha';

describe('Issue time tracking', () => {

  const workTimeConfig = new WorkTimeConfig(5, 8);

  /*beforeEach(() => {

  });*/

  it('original estimate 432000 sec should be 3 weeks', () => {
    let issueTimeTracking = new IssueTimeTracking(432000, 86400 , workTimeConfig);
    expect(issueTimeTracking.originalEstimateText).to.be.equal('3 weeks');
  });

  it('spent time 86400 sec should be 3 days', () => {
    let issueTimeTracking = new IssueTimeTracking(432000, 86400 , workTimeConfig);
    expect(issueTimeTracking.spentTimeText).to.be.equal('3 days');
  });

  it('remaining time when original estimate is 432000 and spent time is 86400 should be 2 weeks 2 days', () => {
    let issueTimeTracking = new IssueTimeTracking(432000, 86400 , workTimeConfig);
    expect(issueTimeTracking.remainingTimeText).to.be.equal('2 weeks 2 days');
  });

});