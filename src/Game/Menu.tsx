import { useGame } from './GameContext';

export const Menu = () => {
  const { level, setLevel } = useGame();
  const colors = ['#0f0', '#af0', '#ff0', '#f80', '#f00'];
  return (
    <div className="mt-6 flex gap-2">
      {colors.map((color, i) => (
        <button
          key={i}
          className="flex h-8 w-8 items-center justify-center rounded text-sm font-black duration-100 hover:scale-105"
          onClick={() => setLevel(i)}
          style={{ backgroundColor: color, opacity: level === i ? 1 : 0.2 }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
