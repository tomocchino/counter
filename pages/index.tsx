import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  let [words, setWords] = useState(new Map());
  let [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    let context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    setAudioContext(context);
    return () => {
      context.close();
    };
  }, []);

  let playClickSound = useCallback(
    (hz: number = 800) => {
      if (audioContext) {
        let oscillator = audioContext.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(hz, audioContext.currentTime); // frequency in hertz

        let gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + 0.1
        );
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    },
    [audioContext]
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let form = event.target as HTMLFormElement;
    let input = form.input;
    let word = input.value.toLowerCase().trim();
    form.reset();
    input.focus();
    if (word) {
      if (!words.has(word)) {
        words.set(word, 0);
        playClickSound(1200);
      }
      updateWords(word, 1);
    }
  }

  function handleButtonClick(event: React.MouseEvent) {
    let input = event.target as HTMLInputElement;
    let word = input.value.toLowerCase();
    updateWords(word, event.altKey ? -1 : 1);
  }

  function handleCountTap(event: React.MouseEvent) {
    let input = event.target as HTMLInputElement;
    let word = input.dataset.for || "";
    updateWords(word, -1);
  }

  function updateWords(word: string, delta: number) {
    playClickSound(delta > 0 ? 800 : 400);
    let count = words.get(word) + delta;
    if (count > 0) {
      words.set(word, count);
    } else {
      words.delete(word);
    }
    setWords(new Map(words));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Counter</title>
        <meta
          name="description"
          content="Simple app for counting things, like repeatedly spoken words or light switches"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <table className={styles.wordList}>
          <tbody>
            <tr>
              <td className={styles.wordRow} colSpan={2}>
                <form onSubmit={handleSubmit}>
                  <input
                    name="input"
                    type="text"
                    placeholder="word or thing"
                    className={styles.wordInput}
                  />
                </form>
              </td>
            </tr>
            {Array.from(words.keys())
              .sort()
              .map((word) => {
                return (
                  <tr className={styles.wordRow} key={word}>
                    <td className={styles.wordButton}>
                      <button value={word} onClick={handleButtonClick}>
                        {word}
                      </button>
                    </td>
                    <td
                      className={styles.wordCount}
                      data-for={word}
                      onClick={handleCountTap}>
                      {words.get(word)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
