import { useRecoilState, useRecoilValue } from "recoil";
import { canvasCard, canvasCardStyle } from "../../state/canvas";

export const colorThemes = {
  white: {
    color: "inherit",
    background: "#fff",
    borderColor: "",
  },
  black: {
    color: "inherit",
    background: "#e7e8ed",
    borderColor: "#919194",
  },
  pink: {
    color: "#eb2f96",
    background: "#fff0f6",
    borderColor: "#ffadd2",
  },
  red: {
    color: "#f5222d",
    background: "#fff1f0",
    borderColor: "#ffa39e",
  },
  volcano: {
    color: "#fa541c",
    background: "#fff2e8",
    borderColor: "#ffbb96",
  },
  orange: {
    color: "#fa8c16",
    background: "#fff7e6",
    borderColor: "#ffd591",
  },
  gold: {
    color: "#faad14",
    background: "#fffbe6",
    borderColor: "#ffe58f",
  },
  cyan: {
    color: "#13c2c2",
    background: "#e6fffb",
    borderColor: "#87e8de",
  },
  green: {
    color: "#52c41a",
    background: "#f6ffed",
    borderColor: "#b7eb8f",
  },
  blue: {
    color: "#1890ff",
    background: "#e6f7ff",
    borderColor: "#91d5ff",
  },
  geekblue: {
    color: "#2f54eb",
    background: "#f0f5ff",
    borderColor: "#adc6ff",
  },
  purple: {
    color: "#722ed1",
    background: "#f9f0ff",
    borderColor: "#d3adf7",
  },
  pinkInverse: {
    color: "#fff",
    background: "#eb2f96",
    borderColor: "#eb2f96",
  },
  redInverse: {
    color: "#fff",
    background: "#f5222d",
    borderColor: "#f5222d",
  },
  volcanoInverse: {
    color: "#fff",
    background: "#fa541c",
    borderColor: "#fa541c",
  },
  orangeInverse: {
    color: "#fff",
    background: "#fa8c16",
    borderColor: "#fa8c16",
  },
  goldInverse: {
    color: "#fff",
    background: "#faad14",
    borderColor: "#faad14",
  },
  cyanInverse: {
    color: "#fff",
    background: "#13c2c2",
    borderColor: "#13c2c2",
  },
  greenInverse: {
    color: "#fff",
    background: "#52c41a",
    borderColor: "#52c41a",
  },
  blueInverse: {
    color: "#fff",
    background: "#1890ff",
    borderColor: "#1890ff",
  },
  geekblueInverse: {
    color: "#fff",
    background: "#2f54eb",
    borderColor: "#2f54eb",
  },
  indigoInverse: {
    color: "#fff",
    background: "#6875f5",
    borderColor: "#6875f5",
  },
  purpleInverse: {
    color: "#fff",
    background: "#722ed1",
    borderColor: "#722ed1",
  },
  blackInverse: {
    color: "#fff",
    background: "#181a22",
    borderColor: "#181a22",
  },
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

export const ColorPicker = ({ id }) => {
  const [card, setCard] = useRecoilState(canvasCard(id));

  return (
    <div className="flex w-36 flex-wrap">
      {Object.entries(colorThemes).map(([theme, css]) => (
        <>
          <span
            onClick={() => setCard((card) => ({ ...card, theme }))}
            className={`w-8 h-8 mr-1 mb-1 border border-solid`}
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
