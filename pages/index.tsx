import Head from "next/head";
import { RecoilRoot } from "recoil";
import CanvasEditor from "../components/canvas/canvas-editor";

export default function Home() {
  return (
    <RecoilRoot>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <CanvasEditor />
    </RecoilRoot>
  );
}
