import React from 'react';
import RimShotSount from './assets/rim-shot.mp3';
import { useKeydown } from './hooks/useKeydown';

export default function App() {
  const [bpm, setBpm] = React.useState(60);
  const [isRunning, setIsRunning] = React.useState(false);
  const bpmInMs = (60 / bpm) * 1000;

  const dotRef = React.createRef<HTMLDivElement>();
  const audioRef = React.createRef<HTMLAudioElement>();

  useKeydown('Space', () => setIsRunning(!isRunning));
  useKeydown('ArrowRight', () => setBpm(bpm + 1));
  useKeydown('ArrowLeft', () => setBpm(bpm - 1));

  React.useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      audioRef.current?.play();
      dotRef.current?.classList.add('dot-active');

      setTimeout(() => {
        dotRef.current?.classList.remove('dot-active');
      }, 200);
    }, bpmInMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [audioRef, bpmInMs, dotRef, isRunning]);

  return (
    <>
      <h1>Metronome</h1>

      <div className='dot' ref={dotRef} />

      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>

      <br />

      <label htmlFor='bpm'>
        <input
          type='range'
          name='bpm'
          id='bpm'
          min={20}
          max={240}
          value={bpm}
          onChange={(e) =>
            setBpm(Number((e.currentTarget as HTMLInputElement).value))
          }
        />
        BPM: {bpm}
      </label>

      <br />

      <audio id='myAudio' src={RimShotSount} ref={audioRef} />
    </>
  );
}
