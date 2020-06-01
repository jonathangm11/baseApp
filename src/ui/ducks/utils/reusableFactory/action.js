/*
   wrap actions to be reusable
   require action to be an object containing one or more actions.
   sample: actions = {
      action1: () => {},
      action2: () => {}
    }
*/

export default (stateId, actions) => {
  const keys = Object.keys(actions);

  const reusableActions = {};

  keys.forEach(key => {
    reusableActions[key] = (...data) => {
      const actionResult = actions[key](...data);

      const { type } = actionResult;
      if (type) {
        actionResult.type = `${stateId}:${type}`;
      } else {
        actionResult.stateId = stateId;
      }

      return actionResult;
    };
  });

  return reusableActions;
};
