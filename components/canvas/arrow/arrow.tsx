import { EditableText } from "@blueprintjs/core";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";
import { ArrowSvg, LineOrientation } from "../react-simple-arrows";

interface Props {
  id: string;
}

const arrowWidth = 4;

export const directionDimensionMap: Record<
  arrowState.ArrowPoint,
  (params: any) => { x: number; y: number }
> = {
  right: ({ x, y, width, height }) => ({
    x: x + width + arrowWidth * 3,
    y: y + arrowWidth + height / 2,
  }),
  left: ({ x, y, height }) => ({
    x: x - arrowWidth,
    y: y + arrowWidth + height / 2,
  }),
  top: ({ y, x, width }) => ({
    y: y - arrowWidth,
    x: x + arrowWidth + width / 2,
  }),
  bottom: ({ y, height, x, width }) => ({
    y: y + arrowWidth * 3 + height,
    x: x + arrowWidth + width / 2,
  }),
};

export const orientations = {
  top: LineOrientation.VERTICAL,
  bottom: LineOrientation.VERTICAL,
  left: LineOrientation.HORIZONTAL,
  right: LineOrientation.HORIZONTAL,
};

export const Arrow = React.memo(({ id }: Props) => {
  const [arrow, setArrow] = useRecoilState(arrowState.arrow(id));

  const [selected, selectArrow] = useState(false);

  const startCard = useRecoilValue(
    cardState.cardDimensions(arrow.start.cardId)
  );
  const endCard = useRecoilValue(cardState.cardDimensions(arrow.end.cardId));

  return (
    <ArrowSvg
      selectArrow={selectArrow}
      selected={selected}
      start={directionDimensionMap[arrow.start.point](startCard)}
      end={directionDimensionMap[arrow.end.point](endCard)}
      orientation={orientations[arrow.end.point]}
      strokeWidth={"3"}
      color={"rgba(55, 65, 81)"}
      curviness={0.3}
    >
      {(selected || arrow.content) && (
        <div className="absolute inset-2/4  w-32 ">
          <div
            className={`${
              selected
                ? "bg-blue-100 border-blue-500"
                : "bg-tan border-gray-800 "
            } p-1.5 absolute -mt-4 -left-1/2 rounded-md border-3`}
          >
            <EditableText
              multiline={false}
              placeholder="Custom label..."
              confirmOnEnterKey={true}
              value={arrow.content}
              onChange={(content) =>
                setArrow((arrow) => ({ ...arrow, content }))
              }
            />
          </div>
        </div>
      )}
    </ArrowSvg>
  );
});
