import { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useGame } from '../Game/GameContext';

export const Editor = () => {
  const { code, setCode } = useGame();

  const handleOnChange = (input: string = '') => {
    setCode(input);
    localStorage.setItem('code', input);
  };

  return (
    <div className="h-4/5">
      <MonacoEditor
        className="z-0"
        defaultValue={code}
        onChange={handleOnChange}
        defaultLanguage="javascript"
        theme="vs-dark"
      />
    </div>
  );
};
