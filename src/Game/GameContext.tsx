import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

export type GameContextType = {
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  running: boolean;
  run: () => void;
};

export const GameContext = createContext<GameContextType>({
  gameOver: false,
  setGameOver: () => null,
  level: 0,
  setLevel: () => null,
  code: '',
  setCode: () => null,
  error: '',
  setError: () => null,
  running: false,
  run: () => null,
});

export const useGame = () => {
  return useContext(GameContext);
};

type GameContextProviderProps = {
  children: ReactNode;
};

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function runHandler(handler: any) {
  return new Promise((resolve, reject) => {
    new AsyncFunction('resolve', 'reject', `try { await ${handler}; resolve(); } catch (e) { reject(e); }`)(
      resolve,
      reject
    );
  });
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);
  const [level, setLevel] = useState(0);
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [error, setError] = useState<string | null>('');

  const run = async () => {
    setRunning(true);

    try {
      await runHandler(code);
      setError(null);
    } catch (e: any) {
      setError(e.toString());
    }

    setRunning(false);
  };

  const value = {
    gameOver,
    running,
    setGameOver,
    level,
    setLevel,
    code,
    setCode,
    error,
    setError,
    run,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
