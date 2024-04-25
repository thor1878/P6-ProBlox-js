import React from 'react';
import { Game } from './Game/Game';
import { Editor } from './Editor/Editor';
import { Navbar } from './Navbar/Navbar';
import { Console } from './Editor/Console';
import { GameContext, GameContextProvider } from './Game/GameContext';

function App() {
  return (
    <GameContextProvider>
      <div className="h-screen w-screen" style={{}}>
        <Navbar />
        <div className="flex h-[calc(100%-24px)] w-full">
          <div className="h-full w-1/2 bg-neutral-900">
            <Editor />
            <Console />
          </div>
          <Game />
        </div>
      </div>
    </GameContextProvider>
  );
}

export default App;
