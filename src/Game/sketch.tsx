import { P5CanvasInstance } from '@p5-wrapper/react';
import { GameContextType } from './GameContext';
import { colors, Maze, mazes, Position } from './GameConfig';

export function sketch(p5: P5CanvasInstance, height: number, game: GameContextType) {
  const scale = 0.7;
  const size = Math.min(window.innerWidth / 2, height) * scale;
  const gridSize = 16;
  const tileSize = size / gridSize;

  p5.setup = () => {
    p5.createCanvas(size, size);
  };

  p5.draw = () => {
    p5.background(255, 0, 0);
    p5.stroke(0);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        p5.fill(colors.wall);
        p5.rect(col * tileSize, row * tileSize, tileSize);
      }
    }

    p5.fill(colors.path);
    for (let i = 0; i < mazes[game.level].path.length - 1; i++) {
      const pos1: Position = mazes[game.level].path[i];
      const pos2: Position = mazes[game.level].path[i + 1];

      if (pos1.row !== pos2.row && pos1.col !== pos2.col) continue;
      else if (pos1.row !== pos2.row) {
        const minimum = Math.min(pos1.row, pos2.row);
        const maximum = Math.max(pos1.row, pos2.row);

        for (let j = minimum; j <= maximum; j++) {
          p5.rect(pos1.col * tileSize, j * tileSize, tileSize);
        }
      } else if (pos1.col !== pos2.col) {
        const minimum = Math.min(pos1.col, pos2.col);
        const maximum = Math.max(pos1.col, pos2.col);

        for (let j = minimum; j <= maximum; j++) {
          p5.rect(j * tileSize, pos1.row * tileSize, tileSize);
        }
      }
    }

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        for (const key in mazes[game.level]) {
          const mazeVal = mazes[game.level][key as keyof Omit<Maze, 'path'>];

          if (!mazeVal) break;
          if (mazeVal.row === row && mazeVal.col === col) {
            p5.fill(colors[key as keyof typeof colors]);
            p5.rect(col * tileSize, row * tileSize, tileSize);
            break;
          }
        }
      }
    }
  };
}
