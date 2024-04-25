import { useGame } from '../Game/GameContext';

export const Navbar = () => {
  const { run, running } = useGame();

  return (
    <div className="flex h-6 justify-center border-b-2 border-sky-700 bg-neutral-800">
      <button className="border text-white disabled:bg-neutral-500" disabled={running} onClick={() => run()}>
        Run
      </button>
      <button className="border text-white">Restart</button>
    </div>
  );
};
