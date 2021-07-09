import * as fromTasks from './tasks.actions';

describe('loadTaskss', () => {
  it('should return an action', () => {
    expect(fromTasks.loadTaskss().type).toBe('[Tasks] Load Taskss');
  });
});
