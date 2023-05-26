import { DispatchWithoutAction, useReducer } from 'react';

interface UseForceUpdateResult {
  updateCounter: number;
  forceUpdate: DispatchWithoutAction;
}

export const useForceUpdate = (): UseForceUpdateResult => {
  const [updateCounter, forceUpdate] = useReducer(
    (count: number): number => ++count,
    0,
  );
  return {
    updateCounter,
    forceUpdate,
  };
};
