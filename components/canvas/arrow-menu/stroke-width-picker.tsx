import { useRecoilValue, useSetRecoilState } from "recoil";
import * as arrowState from "../../state/arrows";

export type ThemeMapOption = {
  color: string;
};

export const strokeWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const StrokeWidthPicker = ({ id }) => {
  const setArrow = useSetRecoilState(arrowState.arrow(id));

  return (
    <div
      style={{ width: 340 }}
      className="flex w-full flex-wrap align-middle justify-between"
    >
      {strokeWidths.map((strokeWidth) => (
        <>
          <div
            onClick={() => setArrow((arrow) => ({ ...arrow, strokeWidth }))}
            className={`w-8 h-8 leading-8 text-xl text-center border cursor-pointer border-solid transform transition-transform hover:scale-110`}
          >
            {strokeWidth}
          </div>
        </>
      ))}
    </div>
  );
};

export const CurrentStrokeWidth = ({ id }) => {
  const arrow = useRecoilValue(arrowState.arrow(id));

  return <div className="w-4 ">{arrow.strokeWidth}</div>;
};
