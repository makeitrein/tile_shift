import { PlayOutline, StopOutline, TrashOutline } from "heroicons-react";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useCreateInitialTile } from "../../state/tile-utils";
import { totalCanvasPixelSize } from "../board/board";

export const RecordSpeech = () => {
  const [message, setMessage] = useState("");

  const createInitialTile = useCreateInitialTile();

  const commands = [
    {
      command: "Create Tile",
      callback: (command, spokenPhrase, similarityRatio) => {
        createInitialTile({
          content: message.replace("create tile", ""),
          dimensions: {
            x: totalCanvasPixelSize / 2 - window.innerWidth / 2,
            y: totalCanvasPixelSize / 2 - window.innerHeight / 2,
          },
        });
      },
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: "Clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    commands,
  });

  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div style={{ height: "50vh" }} className="bg-white p-4 w-96  pb-12">
      <span className="absolute bottom-2 right-2 z-0 inline-flex shadow-sm rounded-md">
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
          type="button"
          className="relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <PlayOutline size={16} />
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <StopOutline size={16} />
        </button>
        <button
          onClick={resetTranscript}
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <TrashOutline size={16} />
        </button>
      </span>
      Add timestamps!
      {listening ? (
        <span className="inline-flex absolute bottom-0 left-1 items-center my-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-red-800  animate-pulse">
          <svg
            className="mr-1.5 h-2 w-2 text-red-800"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>{" "}
          Recording
        </span>
      ) : (
        <span className="inline-flex absolute bottom-0 left-3 items-center my-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <svg
            className="mr-1.5 h-2 w-2 text-gray-800"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>{" "}
          Waiting...
        </span>
      )}
      <p>
        {transcript ? transcript.replace("create tile", "") : <i>Waiting...</i>}
      </p>
      {/* <p>{message}</p> */}
    </div>
  );
};
