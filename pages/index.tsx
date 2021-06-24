import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  let [words, setWords] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let input = form.input;
    let word = input.value.toLowerCase();
    form.reset();
    input.focus();

    if (word) {
      let count = words[word] ? words[word] + 1 : 1;
      setWords({ ...words, [word]: count });
    }
  }

  function handleClick(event) {
    let word = event.target.value.toLowerCase();
    let delta = event.altKey ? -1 : 1;
    let count = words[word] + delta;
    if (count > 0) {
      setWords({ ...words, [word]: count });
    } else {
      delete words[word];
      setWords({ ...words });
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Word Counter</title>
        <meta
          name="description"
          content="Simple app for counting repeated spoken words"
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
                    placeholder="word"
                    className={styles.wordInput}
                  />
                </form>
              </td>
            </tr>
            {Object.keys(words)
              .sort()
              .map((word) => {
                return (
                  <tr className={styles.wordRow} key={word}>
                    <td className={styles.wordButton}>
                      <button value={word} onClick={handleClick}>
                        {word}
                      </button>
                    </td>
                    <td className={styles.wordCount}>{words[word]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
