import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { mazes, Position } from './GameConfig';
import { useWindowState } from './useWindowState';

type GameState = 'RUNNING' | 'DONE' | 'INITIAL';

export type GameContextType = {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
  player: Position;
  setPlayer: Dispatch<SetStateAction<Position>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  level: number;
  doorOpen: boolean;
  blinkTimer: React.MutableRefObject<NodeJS.Timer | undefined>;
  setLevel: (level: number) => void;
  code: React.MutableRefObject<string>;
  setCode: (value: string) => void;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  path: Position[];
  setPath: Dispatch<SetStateAction<Position[]>>;
  run: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
};

export const GameContext = createContext<GameContextType>({
  state: 'INITIAL',
  setState: () => null,
  player: { row: 0, col: 0 },
  setPlayer: () => null,
  gameOver: false,
  setGameOver: () => null,
  level: 0,
  doorOpen: false,
  blinkTimer: { current: undefined },
  setLevel: () => null,
  code: null as unknown as React.MutableRefObject<string>,
  setCode: () => null,
  error: '',
  setError: () => null,
  path: [],
  setPath: () => null,
  run: () => null,
  speed: 200,
  setSpeed: () => null,
});

export const useGame = () => {
  return useContext(GameContext);
};

type GameContextProviderProps = {
  children: ReactNode;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [level, _setLevel] = useState(Number(localStorage.getItem('level') || 0));
  const [player, setPlayer] = useWindowState<Position>('player', { ...mazes[0].player });
  const [gameOver, setGameOver] = useWindowState<boolean>('gameOver', false);
  const [state, setState] = useState<GameState>('INITIAL');
  const [error, setError] = useState<string | null>('');
  const [path, setPath] = useState<Position[]>([]);
  const [doorOpen, setDoorOpen] = useWindowState<boolean>('doorOpen', false);
  const [speed, _setSpeed] = useWindowState<number>('speed', Number(localStorage.getItem('speed') || 200));

  function setLevel(level: number) {
    _setLevel(level);
    localStorage.setItem('level', level.toString());
  }

  function setSpeed(speed: number) {
    _setSpeed(speed);
    localStorage.setItem('speed', speed.toString());
  }

  const blinkTimer = useRef<NodeJS.Timer>();
  const code = useRef<string>(localStorage.getItem('code') || '');
  const setCode = (value: string) => (code.current = value);

  useEffect(() => {
    setState('INITIAL');
    restart();
  }, [level]);

  useEffect(() => {
    updateConditions(player);
  }, [path]);

  useEffect(() => {
    if (state === 'INITIAL') {
      restart();
    }
  }, [state]);

  async function wait() {
    await new Promise((resolve) => setTimeout(resolve, window.speed));
  }

  function restart() {
    clearInterval(blinkTimer.current);
    setPath([]);
    setPlayer({ ...mazes[level].player });
    setDoorOpen(false);
    setGameOver(false);
  }

  function isPathValid(row: number, col: number) {
    const hasPath = path.some((p) => p.row === row && p.col === col);
    const isOnClosedDoor = !window.doorOpen && mazes[level].door?.row === row && mazes[level].door?.col === col;

    if (window.gameOver) return false;

    return hasPath && !isOnClosedDoor;
  }

  function updateConditions(player: Position) {
    window.pathRight = isPathValid(player.row, player.col + 1);
    window.pathBelow = isPathValid(player.row + 1, player.col);
    window.pathLeft = isPathValid(player.row, player.col - 1);
    window.pathAbove = isPathValid(player.row - 1, player.col);
  }

  function isGameComplete(player: Position) {
    return mazes[level].goal.row === player.row && mazes[level].goal.col === player.col;
  }

  function updatePlayer(rowDiff: number, colDiff: number) {
    setPlayer((prev) => {
      if (window.gameOver) {
        updateConditions(prev);
        return prev;
      }
      const newPos = { row: prev.row + rowDiff, col: prev.col + colDiff };
      setGameOver(!isPathValid(newPos.row, newPos.col));
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

  async function pressButton() {
    const buttonPos = mazes[level].button;
    if (window.player.row !== buttonPos?.row || window.player.col !== buttonPos?.col) {
      setGameOver(true);
      return;
    }

    setDoorOpen(!window.doorOpen);
    await wait();
  }

  const run = async () => {
    setState('RUNNING');

    try {
      const funcDefs: string[] = [];
      let modifiedCode = code.current
        .replace(/(move(Right|Down|Left|Up))|pressButton/g, (func) => `await ${func}`)
        .replace(/function (\w+)/g, (_, funcName: string) => {
          funcDefs.push(funcName);
          return `async function ${funcName}`;
        });

      if (funcDefs.length !== 0) {
        modifiedCode = modifiedCode.replace(
          new RegExp(funcDefs.map((def) => `(?<!function )${def}`).join('|'), 'g'),
          (def: string) => `await ${def}`
        );
      }

      await eval(`(async () => {${modifiedCode}})()`);
      setError(null);
    } catch (e: any) {
      setError(e.toString());
    }

    setGameOver(window.gameOver || !isGameComplete(window.player));
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
    doorOpen,
    blinkTimer,
    setLevel,
    code,
    setCode,
    error,
    setError,
    path,
    setPath,
    run,
    speed,
    setSpeed,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
