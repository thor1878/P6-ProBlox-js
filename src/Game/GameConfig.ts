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
  wall: '#111',
};

export const mazes: Maze[] = [
  {
    player: { row: 7, col: 8 },
    goal: { row: 9, col: 7 },
    path: [
      { row: 7, col: 8 },
      { row: 7, col: 7 },
      { row: 9, col: 7 },
    ],
  },
  {
    player: { row: 1, col: 14 },
    goal: { row: 14, col: 1 },
    path: [
      { row: 1, col: 14 },
      { row: 1, col: 1 },
      { row: 14, col: 1 },
    ],
  },
  {
    player: { row: 14, col: 1 },
    goal: { row: 1, col: 14 },
    path: [
      { row: 14, col: 1 },
      { row: 11, col: 1 },
      { row: 11, col: 4 },
      { row: 8, col: 4 },
      { row: 8, col: 4 },
      { row: 8, col: 7 },
      { row: 5, col: 7 },
      { row: 5, col: 10 },
      { row: 2, col: 10 },
      { row: 2, col: 14 },
      { row: 1, col: 14 },
    ],
  },
  {
    player: { row: 1, col: 7 },
    goal: { row: 14, col: 6 },
    path: [
      { row: 1, col: 7 },
      { row: 8, col: 7 },
      { row: 8, col: 6 },
      { row: 14, col: 6 },
    ],
    button: { row: 8, col: 6 },
    door: { row: 11, col: 6 },
  },
  {
    player: { row: 14, col: 14 },
    goal: { row: 1, col: 1 },
    door: { row: 6, col: 8 },
    button: { row: 6, col: 3 },
    path: [
      // --- 1 ---
      { row: 9, col: 14 },
      { row: 9, col: 13 },
      { row: 4, col: 13 },
      { row: 4, col: 12 },
      { row: 1, col: 12 },

      // --- 2 ---
      { row: 9, col: 5 },
      { row: 9, col: 8 },
      { row: 2, col: 8 },
      { row: 2, col: 4 },
      { row: 1, col: 4 },
      { row: 1, col: 1 },

      // --- 3 ---
      { row: 5, col: 5 },
      { row: 4, col: 5 },
      { row: 4, col: 1 },
      { row: 12, col: 1 },
      { row: 12, col: 5 },

      // --- 4 ---
      { row: 6, col: 12 },
      { row: 6, col: 3 },
      { row: 8, col: 3 },
      { row: 8, col: 5 },

      // --- 5 ---
      { row: 11, col: 13 },
      { row: 11, col: 11 },
      { row: 8, col: 11 },
      { row: 8, col: 10 },

      // --- 6 ---
      { row: 14, col: 1 },
      { row: 14, col: 6 },
      { row: 10, col: 6 },

      // --- 7 ---
      { row: 14, col: 14 },
      { row: 14, col: 13 },
      { row: 13, col: 13 },
      { row: 13, col: 10 },
      { row: 11, col: 10 },
      { row: 11, col: 9 },
      { row: 10, col: 9 },
      { row: 10, col: 8 },

      // --- 8 ---
      { row: 3, col: 11 },
      { row: 3, col: 9 },
    ],
  },
];

export default {
  mazes: mazes,
  colors: colors,
};
