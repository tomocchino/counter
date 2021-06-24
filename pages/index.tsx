import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
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
      <div>hello world</div>
    </div>
  );
}
