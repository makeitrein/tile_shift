import { useRecoilState, useRecoilValue } from "recoil";
import { canvasCard, canvasCardStyle } from "../../state/canvas";

export const colorThemes = {
  white: {
    color: "inherit",
    background: "#fff",
    borderColor: "",
  },
  black: {
    color: "#27303f",
    background: "#f1f5f9",
    borderColor: "#27303f",
  },
  pink: {
    color: "#99154b",
    background: "#fce8f3",
    borderColor: "#99154b",
  },
  red: {
    color: "#9b1c1c",
    background: "#fde8e8",
    borderColor: "#9b1c1c",
  },

  orange: {
    color: "#723b13",
    background: "#fdf6b2",
    borderColor: "#723b13",
  },

  cyan: {
    color: "#05505c",
    background: "#d5f5f6",
    borderColor: "#05505c",
  },
  green: {
    color: "#03543f",
    background: "#def7ec",
    borderColor: "#03543f",
  },
  blue: {
    color: "#1e429f",
    background: "#e1effe",
    borderColor: "#1e429f",
  },
  geekblue: {
    color: "#42389d",
    background: "#e5edff",
    borderColor: "#42389d",
  },
  purple: {
    color: "#5521b5",
    background: "#edebfe",
    borderColor: "#5521b5",
  },

  blackInverse: {
    color: "#fff",
    background: "#27303f",
    borderColor: "#27303f",
  },
  pinkInverse: {
    color: "#fff",
    background: "#99154b",
    borderColor: "#99154b",
  },
  redInverse: {
    color: "#fff",
    background: "#9b1c1c",
    borderColor: "#9b1c1c",
  },

  orangeInverse: {
    color: "#fff",
    background: "#723b13",
    borderColor: "#723b13",
  },

  cyanInverse: {
    color: "#fff",
    background: "#05505c",
    borderColor: "#05505c",
  },
  greenInverse: {
    color: "#fff",
    background: "#03543f",
    borderColor: "#03543f",
  },
  blueInverse: {
    color: "#fff",
    background: "#1e429f",
    borderColor: "#1e429f",
  },
  geekblueInverse: {
    color: "#fff",
    background: "#42389d",
    borderColor: "#42389d",
  },
  purpleInverse: {
    color: "#fff",
    background: "#5521b5",
    borderColor: "#5521b5",
  },
};

export const ColorPicker = ({ id }) => {
  const [card, setCard] = useRecoilState(canvasCard(id));

  return (
    <div className="flex w-48 flex-wrap">
      {Object.entries(colorThemes).map(([theme, css]) => (
        <>
          <span
            onClick={() => setCard((card) => ({ ...card, theme }))}
            className={`w-8 h-8 mr-1 mb-1 border cursor-pointer border-solid`}
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
  const style = useRecoilValue(canvasCardStyle(id));

  return (
    <div
      className={`absolute left-0 border border-solid top-0 right-0 bottom-0 w-8 h-8 rounded-r-md`}
      style={{
        ...style,
        borderColor:
          style.borderColor || "rgba(209, 213, 219, var(--tw-border-opacity))",
        transition: ".2s background, .2s border",
      }}
    />
  );
};
