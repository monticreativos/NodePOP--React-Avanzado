import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useStoreAction(actionCreator) {
  const dispatch = useDispatch();
  const dispatchAction = useCallback(
    (...args) => dispatch(actionCreator(...args)),
    [dispatch, actionCreator],
  );
  return dispatchAction;
}
