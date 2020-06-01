import createCachedSelector from 're-reselect';
import hash from 'object-hash';

export default (reducerName, selectors) => {
  const selectorKeys = Object.keys(selectors);
console.log(reducerName, selectors)
  const selectorsForReducer = {};
  selectorKeys.forEach(selectorKey => {
    selectorsForReducer[selectorKey] = createCachedSelector(
      state => state[reducerName],
      (state, ...args) => args,
      (state, args) => selectors[selectorKey](state, ...args)
    )(
      (state, ...args) => hash(args)
    );
  });

  return selectorsForReducer;
};
