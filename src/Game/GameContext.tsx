import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { mazes, Position } from './GameConfig';

declare global {
  interface Window {
    pathRight: boolean;
    pathBelow: boolean;
    pathLeft: boolean;
    pathAbove: boolean;
    gameOver: boolean;
  }
}

type GameState = 'RUNNING' | 'DONE' | 'INITIAL';

export type GameContextType = {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
  player: Position;
  setPlayer: Dispatch<SetStateAction<Position>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  code: React.MutableRefObject<string>;
  setCode: (value: string) => void;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  path: Position[];
  setPath: Dispatch<SetStateAction<Position[]>>;
  run: () => void;
};

export const GameContext = createContext<GameContextType>({
  state: 'INITIAL',
  setState: () => null,
  player: { row: 0, col: 0 },
  setPlayer: () => null,
  gameOver: false,
  setGameOver: () => null,
  level: 0,
  setLevel: () => null,
  code: null as unknown as React.MutableRefObject<string>,
  setCode: () => null,
  error: '',
  setError: () => null,
  path: [],
  setPath: () => null,
  run: () => null,
});

export const useGame = () => {
  return useContext(GameContext);
};

type GameContextProviderProps = {
  children: ReactNode;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [level, setLevel] = useState(0);
  const [player, setPlayer] = useState<Position>({ ...mazes[0].player });
  const [gameOver, setGameOver] = useState(false);
  const [state, setState] = useState<GameState>('INITIAL');
  // const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [error, setError] = useState<string | null>('');
  const [path, setPath] = useState<Position[]>([]);

  const code = useRef<string>(localStorage.getItem('code') || '');
  const setCode = (value: string) => (code.current = value);

  useEffect(() => {
    setState('INITIAL');
    restart();
  }, [level]);

  useEffect(() => {
    if (!gameOver) return;
    console.log('GAME OVER NEGUS');
  }, [gameOver]);

  useEffect(() => {
    if (state === 'INITIAL') {
      console.log('before restart');

      restart();
    }
    if (state !== 'DONE') return;
    console.log(player);
    if (isGameComplete(player)) {
      console.log('COMPLETE');
    } else {
      console.log('GAME OVER');
    }
  }, [state]);

  async function wait() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  function restart() {
    setPath([]);
    setPlayer({ ...mazes[level].player });
    updateConditions(player);
    setGameOver(false);
    window.gameOver = false;
  }

  function updateConditions(player: Position) {
    window.pathRight = path.some((p) => p.row === player.row && p.col === player.col + 1);
    window.pathBelow = path.some((p) => p.row === player.row + 1 && p.col === player.col);
    window.pathLeft = path.some((p) => p.row === player.row && p.col === player.col - 1);
    window.pathAbove = path.some((p) => p.row === player.row - 1 && p.col === player.col);
  }

  function isGameComplete(player: Position) {
    return mazes[level].goal.row === player.row && mazes[level].goal.col === player.col;
  }

  function updatePlayer(rowDiff: number, colDiff: number) {
    setPlayer((prev) => {
      if (window.gameOver) return prev;
      const newPos = { row: prev.row + rowDiff, col: prev.col + colDiff };
      console.log(!path.some((p) => p.row === newPos.row && p.col === newPos.col));
      window.gameOver = !path.some((p) => p.row === newPos.row && p.col === newPos.col);
      setGameOver(window.gameOver);
      updateConditions(newPos);
      return newPos;
    });
  }

  async function moveRight() {
    updatePlayer(0, 1);
    await wait();
  }

  async function moveDown() {
    updatePlayer(1, 0);
    await wait();
  }

  async function moveLeft() {
    updatePlayer(0, -1);
    await wait();
  }

  async function moveUp() {
    updatePlayer(-1, 0);
    await wait();
  }

  const run = async () => {
    setState('RUNNING');

    try {
      const awaitedCode = code.current.replace(/move(Right|Down|Left|Up)/g, (func) => `await ${func}`);
      await eval(`(async () => {${awaitedCode}})()`);
      setError(null);
    } catch (e: any) {
      setError(e.toString());
    }

    setState('DONE');
  };

  const value = {
    player,
    setPlayer,
    gameOver,
    state,
    setState,
    setGameOver,
    level,
    setLevel,
    code,
    setCode,
    error,
    setError,
    path,
    setPath,
    run,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
