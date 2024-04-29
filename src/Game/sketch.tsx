import { P5CanvasInstance } from '@p5-wrapper/react';
import { GameContextType } from './GameContext';
import { colors, Maze, mazes } from './GameConfig';

export function sketch(p5: P5CanvasInstance, height: number, game: GameContextType) {
  const scale = 0.7;
  const size = Math.min(window.innerWidth / 2, height) * scale;
  const gridSize = 16;
  const tileSize = size / gridSize;

  p5.setup = () => {
    p5.noLoop();
    p5.createCanvas(size, size);

    p5.background(34, 34, 34);
    p5.stroke(34, 34, 34);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        p5.fill(colors.wall);
        p5.rect(col * tileSize, row * tileSize, tileSize, tileSize, 2);
      }
    }

    p5.fill(colors.path);
    for (const path of game.path) {
      p5.rect(path.col * tileSize, path.row * tileSize, tileSize, tileSize, 2);
    }

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        for (const key in mazes[game.level]) {
          const mazeVal = mazes[game.level][key as keyof Omit<Maze, 'path'>];

          if (!mazeVal) break;
          if (key === 'player') continue;
          if (mazeVal.row === row && mazeVal.col === col) {
            p5.fill(colors[key as keyof typeof colors]);
            p5.rect(col * tileSize, row * tileSize, tileSize, tileSize, 2);
            break;
          }
        }

        if (game.player.col === col && game.player.row === row) {
          p5.fill(colors.player);
          p5.rect(col * tileSize, row * tileSize, tileSize, tileSize, 2);
        }
      }
    }
  };
}
