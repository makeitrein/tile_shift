import { useRecoilValue, useSetRecoilState } from "recoil";
import * as tileState from "../../state/tiles";

export type ThemeMapOption = {
  color: string;
  background: string;
  borderColor: string;
};

export type ThemeMap = Record<string, ThemeMapOption>;

export const colorThemes: ThemeMap = {
  black: {
    color: "#fff",
    background: "#27303f",
    borderColor: "#27303f",
  },

  white: {
    color: "#27303f",
    background: "#fff",
    borderColor: "",
  },

  red: {
    color: "#fff",
    background: "#ee6962",
    borderColor: "#ee6962",
  },

  orange: {
    color: "#fff",
    background: "#fcca48",
    borderColor: "#fcca48",
  },

  green: {
    color: "#fff",
    background: "#8ececa",
    borderColor: "#8ececa",
  },

  purple: {
    color: "#fff",
    background: "#9282f0",
    borderColor: "#9282f0",
  },
};

export const ColorPicker = ({ id }) => {
  const setTileSettings = useSetRecoilState(tileState.tileSettings(id));

  return (
    <div
      style={{ width: 380 }}
      className="flex h-20 w-full flex-wrap flex-col align-middle pt-4 pb-1 px-4 justify-between"
    >
      {Object.entries(colorThemes).map(([theme, css]) => (
        <>
          <span
            onClick={() =>
              setTileSettings((settings) => ({ ...settings, theme }))
            }
            className={`w-12 h-12 mb-3 px-1 rounded-lg border cursor-pointer border-solid transform transition-transform hover:scale-110`}
            style={{
              ...css,
              borderColor: css.borderColor || "rgba(209, 213, 219)",
            }}
          />
        </>
      ))}
    </div>
  );
};

export const ColorBlock = ({ id }) => {
  const style = useRecoilValue(tileState.tileColorTheme(id));

  return (
    <div className="w-4 ">
      <div
        className={`absolute left-0 top-0 right-0 bottom-0 border -mr-px z-10 border-solid text-center inline-flex items-center justify-center`}
        style={{
          background: style.background || "white",
          borderColor:
            style.borderColor ||
            "rgba(209, 213, 219, var(--tw-border-opacity))",
          transition: ".2s background, .2s border",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-4 h-4"
          stroke={style.color || "currentColor"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </div>
    </div>
  );
};
