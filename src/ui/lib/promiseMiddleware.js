const promiseMiddleware = () => {
  const cache = {};

  return store => next => action => {
    const { type, promise, ...rest } = action;
    next(action);

    if ( !promise || promise === undefined || promise.then === undefined) {
      return undefined; 
    }

    cache[type] = cache[type] || Promise.resolve();

    //const pendingActionType = `${type}_PENDING`;
    const successActionType = `${type}_SUCCESS`;
    const failureActionType = `${type}_FAILURE`;

    cache[type] = cache[type].then(() => promise
      .then((result) => store.dispatch({
        ...rest,
        result,
        type: successActionType,
      }))
      .catch((error) => store.dispatch({
        ...rest,
        error,
        type: failureActionType,
      })));
    return cache[type]; 
  };
};
const constructor = () => {      
  return promiseMiddleware();
};
export default constructor();
