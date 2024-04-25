export type Position = {
  readonly row: number;
  readonly col: number;
};

export type Maze = {
  readonly player: Position;
  readonly goal: Position;
  readonly button?: Position;
  readonly door?: Position;
  readonly path: Position[];
};

export const colors = {
  player: '#0000FF',
  goal: '#008000',
  button: '#800080',
  door: '#FF0000',
  doorOpen: '#A9A9A9',
  path: '#A9A9A9',
  wall: '#222',
};

export const mazes: Maze[] = [
  {
    player: { row: 7, col: 8 },
    goal: { row: 9, col: 7 },
    path: [
      { row: 7, col: 7 },
      { row: 8, col: 7 },
    ],
  },
  {
    player: { row: 1, col: 14 },
    goal: { row: 14, col: 1 },
    path: [
      { row: 1, col: 13 },
      { row: 1, col: 1 },
      { row: 13, col: 1 },
    ],
  },
  {
    player: { row: 14, col: 1 },
    goal: { row: 1, col: 14 },
    path: [
      { row: 13, col: 1 },
      { row: 11, col: 1 },
      { row: 11, col: 4 },
      { row: 8, col: 4 },
      { row: 8, col: 4 },
      { row: 8, col: 7 },
      { row: 5, col: 7 },
      { row: 5, col: 10 },
      { row: 2, col: 10 },
      { row: 2, col: 14 },
    ],
  },
  {
    player: { row: 1, col: 7 },
    goal: { row: 14, col: 6 },
    path: [
      { row: 2, col: 7 },
      { row: 8, col: 7 },
      { row: 8, col: 6 },
      { row: 13, col: 6 },
    ],
    button: { row: 8, col: 6 },
    door: { row: 11, col: 6 },
  },
  {
    player: { row: 7, col: 8 },
    goal: { row: 9, col: 7 },
    path: [
      { row: 7, col: 7 },
      { row: 8, col: 7 },
    ],
  },
];

export default {
  mazes: mazes,
  colors: colors,
};
