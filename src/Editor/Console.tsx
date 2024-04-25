import { useGame } from '../Game/GameContext';

export const Console = () => {
  const { error } = useGame();

  return (
    <div className="flex h-1/5 w-full flex-col border-t-2 border-sky-700 bg-neutral-800">
      <div className="flex h-6 w-full items-center bg-neutral-900 pl-2 text-[8px] font-bold text-gray-500">OUTPUT</div>
      <div className="overflow-y-scroll break-all px-2 py-1 text-sm text-red-500">{error}</div>
    </div>
  );
};
