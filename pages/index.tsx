import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  let [words, setWords] = useState(new Map());

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let form = event.target as HTMLFormElement;
    let input = form.input;
    let word = input.value.toLowerCase().trim();
    form.reset();
    input.focus();
    if (word) {
      let count = words.has(word) ? words.get(word) + 1 : 1;
      words.set(word, count);
      setWords(new Map(words));
    }
  }

  function handleClick(event: React.MouseEvent) {
    let input = event.target as HTMLInputElement;
    let word = input.value.toLowerCase();
    let delta = event.altKey ? -1 : 1;
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
                      <button value={word} onClick={handleClick}>
                        {word}
                      </button>
                    </td>
                    <td className={styles.wordCount}>{words.get(word)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
