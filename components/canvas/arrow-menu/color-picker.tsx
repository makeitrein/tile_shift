import { useRecoilValue, useSetRecoilState } from "recoil";
import { arrow, arrowColorTheme } from "../../state/arrows";

export type ThemeMapOption = {
  color: string;
};

export type ThemeMap = Record<string, ThemeMapOption>;

export const colorThemes: ThemeMap = {
  black: {
    color: "#27303f",
  },
  pink: {
    color: "#99154b",
  },
  red: {
    color: "#9b1c1c",
  },
  orange: {
    color: "#723b13",
  },
  cyan: {
    color: "#05505c",
  },
  green: {
    color: "#03543f",
  },
  blue: {
    color: "#1e429f",
  },
  geekblue: {
    color: "#42389d",
  },
  purple: {
    color: "#5521b5",
  },
};

export const ColorPicker = ({ id }) => {
  const setArrow = useSetRecoilState(arrow(id));

  return (
    <div
      style={{ width: 340 }}
      className="flex w-full flex-wrap align-middle justify-between"
    >
      {Object.entries(colorThemes).map(([theme, css]) => (
        <>
          <span
            onClick={() => setArrow((arrow) => ({ ...arrow, theme }))}
            className={`w-8 h-8 mb-1 px-1 border cursor-pointer border-solid transform transition-transform hover:scale-110`}
            style={{
              borderRadius: "40% 60% 70% 30% / 40% 40% 60% 50%",
              background: css.color,
            }}
          />
        </>
      ))}
    </div>
  );
};

export const ColorBlock = ({ id }) => {
  const style = useRecoilValue(arrowColorTheme(id));

  return (
    <div className="w-4 ">
      <div
        className={`absolute left-0 top-0 right-0 bottom-0 border -mr-px z-10 border-solid text-center inline-flex items-center justify-center`}
        style={{
          background: style.color || "white",
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
