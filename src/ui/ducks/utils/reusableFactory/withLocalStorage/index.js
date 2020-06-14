
export default (stateId, reducer) => {
  
  return (
    state = JSON.parse(localStorage.getItem(stateId))|| undefined,
    action
  ) => {
    const newState = reducer(state, action);    
    localStorage.setItem(stateId, JSON.stringify(newState));    
    return newState;
  };
};
