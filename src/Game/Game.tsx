import { useRef, useEffect, useState } from 'react';
import { sketch } from './sketch';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { useGame } from './GameContext';
import { mazes, Position } from './GameConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBackward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Menu } from './Menu';

export const Game = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const game = useGame();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(containerRef.current.offsetHeight);
  }, [containerRef.current]);

  useEffect(() => {
    if (game.path.length > 0) return;

    const path: Position[] = [];
    for (let i = 0; i < mazes[game.level].path.length - 1; i++) {
      const pos1: Position = mazes[game.level].path[i];
      const pos2: Position = mazes[game.level].path[i + 1];

      if (pos1.row !== pos2.row && pos1.col !== pos2.col) continue;
      else if (pos1.row !== pos2.row) {
        const minimum = Math.min(pos1.row, pos2.row);
        const maximum = Math.max(pos1.row, pos2.row);

        for (let j = minimum; j <= maximum; j++) {
          path.push({ row: j, col: pos1.col });
        }
      } else if (pos1.col !== pos2.col) {
        const minimum = Math.min(pos1.col, pos2.col);
        const maximum = Math.max(pos1.col, pos2.col);

        for (let j = minimum; j <= maximum; j++) {
          path.push({ row: pos1.row, col: j });
        }
      }
    }
    game.setPath(path);
  }, [game.path]);

  return (
    <div
      ref={containerRef}
      className="flex w-1/2 flex-col items-center justify-center border-l-2 border-sky-700 bg-neutral-800 "
    >
      <div className="flex gap-x-3">
        <button
          className="text-green-500 disabled:text-neutral-500"
          disabled={game.state !== 'INITIAL'}
          onClick={() => game.run()}
        >
          <FontAwesomeIcon icon={faPlay} className="text-2xl" />
        </button>
        <button
          className="text-sky-500 disabled:text-gray-500"
          disabled={game.state !== 'DONE'}
          onClick={() => game.setState('INITIAL')}
        >
          <FontAwesomeIcon icon={faArrowRotateBackward} className="text-2xl" />
        </button>
      </div>
      <ReactP5Wrapper sketch={(p5) => sketch(p5, height, game)} />
      <Menu />
    </div>
  );
};
