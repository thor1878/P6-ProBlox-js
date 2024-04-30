import { useGame } from './GameContext';

export const Speed = () => {
  const { speed, setSpeed, state } = useGame();

  const speeds = [
    { text: '0.5x', value: 400 },
    { text: '1x', value: 200 },
    { text: '2x', value: 100 },
  ];

  return (
    <div
      className="absolute right-0 flex translate-x-[calc(100%+5px)] flex-col gap-y-1 rounded-[2px] bg-neutral-700 p-1 text-[9px] font-bold text-white"
      style={{ opacity: state === 'RUNNING' ? 0.3 : 1 }}
    >
      {speeds.map((s, i) => (
        <button
          key={i}
          className={`rounded-[2px] p-0.5 ${s.value === speed && 'bg-neutral-800'}`}
          disabled={state === 'RUNNING'}
          onClick={() => setSpeed(s.value)}
        >
          {s.text}
        </button>
      ))}
    </div>
  );
};
