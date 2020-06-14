import _ from 'lodash';

export default (stateId, reducer) => (state = reducer(), action) => {
  let { actionStateId, reducerActionType } = {};

  const dispatchedActionType = action.type;
  const splittedActionType = _.split(dispatchedActionType, ':');
  if (splittedActionType.length >= 2) {
    // have stateId in dispatched action type
    actionStateId = _.head(splittedActionType);
    reducerActionType = _.tail(splittedActionType).join(':');
  } else {
    // otherwise check the action payload
    actionStateId = action.stateId;
    reducerActionType = action.type;
  }

  if (actionStateId !== stateId) {
    return state;
  }

  const newState = reducer(state, {
    ...action,
    type: reducerActionType, // overwrite the dispatched with the original reducer action type
  });

  return newState;
};
