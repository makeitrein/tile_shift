import { useRecoilValue, useSetRecoilState } from "recoil";
import * as cardState from "../../state/cards";

export type ThemeMapOption = {
  color: string;
  background: string;
  borderColor: string;
};

export type ThemeMap = Record<string, ThemeMapOption>;

export const colorThemes: ThemeMap = {
  blackInverse: {
    color: "#fff",
    background: "#27303f",
    borderColor: "#27303f",
  },
  black: {
    color: "#27303f",
    background: "#f1f5f9",
    borderColor: "#27303f",
  },
  white: {
    color: "#27303f",
    background: "#fff",
    borderColor: "",
  },
  pinkInverse: {
    color: "#fff",
    background: "#99154b",
    borderColor: "#99154b",
  },
  pink: {
    color: "#99154b",
    background: "#fce8f3",
    borderColor: "#99154b",
  },
  pinkBorder: {
    color: "#99154b",
    background: "",
    borderColor: "#99154b",
  },
  redInverse: {
    color: "#fff",
    background: "#9b1c1c",
    borderColor: "#9b1c1c",
  },
  red: {
    color: "#9b1c1c",
    background: "#fde8e8",
    borderColor: "#9b1c1c",
  },
  redBorder: {
    color: "#9b1c1c",
    background: "",
    borderColor: "#9b1c1c",
  },
  orangeInverse: {
    color: "#fff",
    background: "#723b13",
    borderColor: "#723b13",
  },
  orange: {
    color: "#723b13",
    background: "#fdf6b2",
    borderColor: "#723b13",
  },
  orangeBorder: {
    color: "#723b13",
    background: "",
    borderColor: "#723b13",
  },
  cyanInverse: {
    color: "#fff",
    background: "#05505c",
    borderColor: "#05505c",
  },
  cyan: {
    color: "#05505c",
    background: "#d5f5f6",
    borderColor: "#05505c",
  },
  cyanBorder: {
    color: "#05505c",
    background: "",
    borderColor: "#05505c",
  },
  greenInverse: {
    color: "#fff",
    background: "#03543f",
    borderColor: "#03543f",
  },
  green: {
    color: "#03543f",
    background: "#def7ec",
    borderColor: "#03543f",
  },
  greenBorder: {
    color: "#03543f",
    background: "",
    borderColor: "#03543f",
  },
  blueInverse: {
    color: "#fff",
    background: "#1e429f",
    borderColor: "#1e429f",
  },
  blue: {
    color: "#1e429f",
    background: "#e1effe",
    borderColor: "#1e429f",
  },
  blueBorder: {
    color: "#1e429f",
    background: "",
    borderColor: "#1e429f",
  },
  geekblueInverse: {
    color: "#fff",
    background: "#42389d",
    borderColor: "#42389d",
  },
  geekblue: {
    color: "#42389d",
    background: "#e5edff",
    borderColor: "#42389d",
  },

  geekblueBorder: {
    color: "#42389d",
    background: "",
    borderColor: "#42389d",
  },
  purpleInverse: {
    color: "#fff",
    background: "#5521b5",
    borderColor: "#5521b5",
  },
  purple: {
    color: "#5521b5",
    background: "#edebfe",
    borderColor: "#5521b5",
  },

  purpleBorder: {
    color: "#5521b5",
    background: "",
    borderColor: "#5521b5",
  },
};

export const ColorPicker = ({ id }) => {
  const setCardSettings = useSetRecoilState(cardState.cardSettings(id));

  return (
    <div
      style={{ width: 340 }}
      className="flex h-28 w-full flex-wrap flex-col align-middle justify-between"
    >
      {Object.entries(colorThemes).map(([theme, css]) => (
        <>
          <span
            onClick={() =>
              setCardSettings((settings) => ({ ...settings, theme }))
            }
            className={`w-8 h-8 mb-1 px-1 border cursor-pointer border-solid transform transition-transform hover:scale-110`}
            style={{
              borderRadius: "40% 60% 70% 30% / 40% 40% 60% 50%",

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
  const style = useRecoilValue(cardState.cardColorTheme(id));

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
