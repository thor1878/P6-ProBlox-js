import { useRef, useEffect, useState } from 'react';
import { sketch } from './sketch';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { useGame } from './GameContext';

export const Game = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const game = useGame();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setHeight(containerRef.current.offsetHeight);
  }, [containerRef.current]);
  return (
    <div
      ref={containerRef}
      className="flex w-1/2 flex-col items-center justify-center border-l-2 border-sky-700 bg-neutral-800 "
    >
      <ReactP5Wrapper sketch={(p5) => sketch(p5, height, game)} />
    </div>
  );
};
