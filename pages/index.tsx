import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import Head from "next/head";
import React from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Board } from "../components/canvas/board/board";

export default function Home() {
  // if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   const whyDidYouRender = require("@welldone-software/why-did-you-render");
  //   // eslint-disable-next-line no-console
  //   console.debug(
  //     "Applying whyDidYouRender, to help you locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render"
  //   );
  //   whyDidYouRender(React, {
  //     trackAllPureComponents: true,
  //   });
  // }

  return (
    <>
      <Head>
        <title>TileShift</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <Board />
    </>
  );
}
