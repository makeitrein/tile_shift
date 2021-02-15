import * as Comlink from "comlink";
import React from "react";
import { WorkerApi } from "../workers/comlink.worker";

const IndexPage = () => {
  // for comlink
  const [comlinkMessage, setComlinkMessage] = React.useState("");
  const comlinkWorkerRef = React.useRef<Worker>();
  const comlinkWorkerApiRef = React.useRef<Comlink.Remote<WorkerApi>>();

  React.useEffect(() => {
    comlinkWorkerRef.current = new Worker("../workers/comlink.worker", {
      type: "module",
    });
    comlinkWorkerApiRef.current = Comlink.wrap<WorkerApi>(
      comlinkWorkerRef.current
    );
    console.log(Comlink.wrap<WorkerApi>(comlinkWorkerRef.current));
    return () => {
      comlinkWorkerRef.current?.terminate();
    };
  }, []);

  const handleComlinkWork = async () => {
    console.log(comlinkWorkerApiRef.current);
    const msg = await comlinkWorkerApiRef.current?.getName();
    setComlinkMessage(`Comlink response => ${msg}`);
  };

  return (
    <>
      <h1>Hello Next.js, TypeScript, Web Worker and Comlink👋</h1>
      <div>
        <h2>
          Let's use <em>Comlink</em> Web worker!
        </h2>
        <button onClick={handleComlinkWork}>
          fetch random word by Comlink
        </button>
        <p>Result: {comlinkMessage}</p>
      </div>
    </>
  );
};

export default IndexPage;
