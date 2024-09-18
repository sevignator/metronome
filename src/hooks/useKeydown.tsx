import React from 'react';

export function useKeydown(keyCode: string, callback: () => void) {
  React.useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.code !== keyCode) return;

      callback();
    };

    document.addEventListener('keydown', eventHandler);

    return () => {
      document.removeEventListener('keydown', eventHandler);
    };
  });
}
