import { P5CanvasInstance } from '@p5-wrapper/react';
import { GameContextType } from './GameContext';
import { colors, mazes } from './GameConfig';

export function sketch(p5: P5CanvasInstance, height: number, game: GameContextType) {
  const scale = 0.7;
  const size = Math.min(window.innerWidth / 2, height) * scale;
  const gridSize = 16;
  const tileSize = size / gridSize;
  const maze = mazes[game.level];

  p5.setup = () => {
    p5.noLoop();
    p5.createCanvas(size, size);

    p5.background(34, 34, 34);
    p5.stroke(34, 34, 34);

    // Walls
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        p5.fill(colors.wall);
        p5.rect(col * tileSize, row * tileSize, tileSize, tileSize, 2);
      }
    }

    if (game.state !== 'DONE' || (game.state === 'DONE' && game.gameOver)) {
      // Paths
      p5.fill(colors.path);
      for (const path of game.path) {
        p5.rect(path.col * tileSize, path.row * tileSize, tileSize, tileSize, 2);
      }

      // Door
      if (maze.door) {
        p5.fill(game.doorOpen ? colors.doorOpen : colors.door);
        p5.rect(maze.door.col * tileSize, maze.door.row * tileSize, tileSize, tileSize, 2);
      }

      // Button
      if (maze.button) {
        p5.fill(colors.button);
        p5.rect(maze.button.col * tileSize, maze.button.row * tileSize, tileSize, tileSize, 2);
      }

      // Goal
      p5.fill(colors.goal);
      p5.rect(maze.goal.col * tileSize, maze.goal.row * tileSize, tileSize, tileSize, 2);
    }

    // Player
    if (game.state === 'DONE') {
      let fillPlayer = true;
      let color: string;

      if (window.player.col === maze.goal.col && window.player.row === maze.goal.row) {
        color = colors.goal;
      } else if (window.player.col === maze.door?.col && window.player.row === maze.door?.row) {
        color = game.doorOpen ? colors.doorOpen : colors.door;
      } else if (window.player.col === maze.button?.col && window.player.row === maze.button?.row) {
        color = colors.button;
      } else if (game.path.some((p) => p.col === window.player.col && p.row === window.player.row)) {
        color = colors.path;
      } else {
        color = colors.wall;
      }

      game.blinkTimer.current = setInterval(() => {
        p5.fill(fillPlayer ? colors.player : color);
        p5.rect(game.player.col * tileSize, game.player.row * tileSize, tileSize, tileSize, 2);
        fillPlayer = !fillPlayer;
      }, 300);
    } else {
      p5.fill(colors.player);
      p5.rect(game.player.col * tileSize, game.player.row * tileSize, tileSize, tileSize, 2);
    }
  };
}
