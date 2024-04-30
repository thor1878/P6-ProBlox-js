import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Position } from './GameConfig';

declare global {
  interface Window {
    pathRight: boolean;
    pathBelow: boolean;
    pathLeft: boolean;
    pathAbove: boolean;
    gameOver: boolean;
    player: Position;
    doorOpen: boolean;
    speed: number;
  }
}

export const useWindowState = <S>(name: string, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const [state, _setState] = useState<S>(initialState);

  function setState(s: any) {
    if (typeof s !== 'function') {
      window[name as any] = s;
    }
    _setState(s);
  }

  useEffect(() => {
    window[name as any] = state as any;
  }, [state]);

  return [state, setState];
};
