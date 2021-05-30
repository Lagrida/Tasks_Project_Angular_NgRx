import * as fromUsersAction from './users-action.actions';

describe('loadUsersActions', () => {
  it('should return an action', () => {
    expect(fromUsersAction.loadUsersActions().type).toBe('[UsersAction] Load UsersActions');
  });
});
