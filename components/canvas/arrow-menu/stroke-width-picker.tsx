import { useRecoilValue, useSetRecoilState } from "recoil";
import * as arrowState from "../../state/arrows";

export type ThemeMapOption = {
  color: string;
};

export const strokeWidths = { SM: 1, MD: 3, LG: 6, XL: 9 };
const strokeWidthsByWidth = { 1: "SM", 3: "MD", 6: "LG", 9: "XL" };

export const StrokeWidthPicker = ({ id }) => {
  const setArrow = useSetRecoilState(arrowState.arrow(id));

  return (
    <div
      style={{ width: 230 }}
      className="flex w-full flex-wrap align-middle justify-between"
    >
      {Object.entries(strokeWidths).map(([name, strokeWidth]) => (
        <>
          <div
            onClick={() => setArrow((arrow) => ({ ...arrow, strokeWidth }))}
            className={`p-1 w-12 leading-8 text-xl text-center border cursor-pointer border-solid transform transition-transform hover:scale-110`}
          >
            {name}
          </div>
        </>
      ))}
    </div>
  );
};

export const CurrentStrokeWidth = ({ id }) => {
  const arrow = useRecoilValue(arrowState.arrow(id));

  return (
    <div className="text-xl">{strokeWidthsByWidth[arrow.strokeWidth]}</div>
  );
};
