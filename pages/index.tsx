import Head from "next/head";
import { RecoilRoot } from "recoil";
import { Board } from "../components/canvas/board/board";

export default function Home() {
  return (
    <RecoilRoot>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <Board />
    </RecoilRoot>
  );
}
