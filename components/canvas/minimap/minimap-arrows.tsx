import React from "react";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as tileState from "../../state/tiles";
import { directionDimensionMap } from "../arrow/arrow";
import { LineOrientation } from "../react-simple-arrows";
import { BasicArrowSvg } from "../react-simple-arrows/ArrowSvg/BasicArrowSvg";
import { minimapSizeDivider } from "./minimap";
export const minimapId = "minimap";

export const MiniMapArrows = React.memo(() => {
  const arrowIds = useRecoilValue(arrowState.arrowIds);

  return (
    <>
      {arrowIds.map((id) => (
        <MiniMapArrow key={id} id={id} />
      ))}
    </>
  );
});

interface Props {
  id: string;
}

export const MiniMapArrow = React.memo(({ id }: Props) => {
  const arrow = useRecoilValue(arrowState.arrow(id));
  const { color } = useRecoilValue(arrowState.arrowColorTheme(id));

  const startTile = useRecoilValue(
    tileState.tileDimensions(arrow.start.tileId)
  );
  const endTile = useRecoilValue(tileState.tileDimensions(arrow.end.tileId));

  const startTileSettings = useRecoilValue(
    tileState.tileSettings(arrow.start.tileId)
  );
  const endTileSettings = useRecoilValue(
    tileState.tileSettings(arrow.end.tileId)
  );

  if (startTileSettings.deleted || endTileSettings.deleted) {
    return null;
  }

  const resizeDimensions = ({ x, y, ...rest }: { x: number; y: number }) => ({
    ...rest,
    x: x / (minimapSizeDivider - 3),
    y: y / (minimapSizeDivider - 3),
  });

  return (
    <BasicArrowSvg
      start={resizeDimensions(
        directionDimensionMap[arrow.start.point](startTile)
      )}
      end={resizeDimensions(directionDimensionMap[arrow.end.point](endTile))}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth={"1"}
      color={color}
    />
  );
});
