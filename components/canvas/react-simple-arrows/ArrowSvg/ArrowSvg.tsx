import React from "react";
import useOnClickOutside from "react-cool-onclickoutside";
import { v4 as uuidv4 } from "uuid";
import { LineOrientation, Position } from "../constants";
import { ArrowHeadMarkerSvg } from "./ArrowHeadMarkerSvg";
import { calculateAestheticLinePath } from "./calculateAestheticLinePath";

const ARROW_LENGTH = 15;
const ARROW_WIDTH = 14;

export const ArrowSvg = ({
  start,
  end,
  orientation,
  curviness = 0.6,
  color = "black",
  strokeWidth = "1",
  selectArrow,
  selected,
  children,
}: {
  start: Position;
  end: Position;
  orientation: LineOrientation;
  curviness?: number;
  color?: string;
  strokeWidth?: string;
  selectArrow: (visible: boolean) => void;
  selected: boolean;
  children: React.ReactNode;
}) => {
  const headId = uuidv4();

  // define dimensions and coordinates of the svg plane
  const dimensions = {
    height: Math.abs(start.y - end.y),
    width: Math.abs(start.x - end.x),
  };
  const coordinates = {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
  };

  // add room for padding to the svg plane
  const padding = ARROW_WIDTH; // as otherwise half of arrow head would be outside of svg when it goes to edge
  const paddedDimensions = {
    height: dimensions.height + padding, // i.e., add room for half an arrow width at each side
    width: dimensions.width + padding,
  };
  const paddedCoordinates = {
    x: coordinates.x - padding / 2, // half padding to allow for equal distance from edge on both sides
    y: coordinates.y - padding / 2,
  };

  // map the coordinates of the line from page coordinates into the svg plane coordinates (i.e., if starting at top left, the start coordinates would be (0, 0) plus padding offset)
  const innerStart = {
    x: start.x - paddedCoordinates.x,
    y: start.y - paddedCoordinates.y,
  };
  const innerEnd = {
    x: end.x - paddedCoordinates.x,
    y: end.y - paddedCoordinates.y,
  };

  const arrowRef = useOnClickOutside(() => {
    selectArrow(false);
  });

  const arrowColor = selected ? "rgba(59, 130, 246)" : color;

  // return arrow positioned absolutely at the viewport w/ arrows positioned internally
  return (
    <span
      ref={arrowRef}
      style={{
        height: paddedDimensions.height,
        width: paddedDimensions.width,
        position: "absolute",
        top: paddedCoordinates.y,
        left: paddedCoordinates.x,
      }}
    >
      {children}

      <svg height={paddedDimensions.height} width={paddedDimensions.width}>
        <defs>
          <ArrowHeadMarkerSvg
            length={ARROW_LENGTH}
            width={ARROW_WIDTH}
            id={headId}
            color={arrowColor}
          />
        </defs>
        {/* Provide a background path with bigger click radius that is transparent but clickable */}
        <path
          style={{ cursor: "pointer" }}
          onClick={() => selectArrow(true)}
          d={calculateAestheticLinePath({
            start: innerStart,
            end: innerEnd,
            orientation,
            curviness,
          })}
          fill="none"
          stroke="transparent"
          strokeWidth={90}
        />
        {/* Visible path goodness */}
        <path
          style={{ cursor: "pointer", transition: ".2s stroke" }}
          onClick={() => selectArrow(true)}
          d={calculateAestheticLinePath({
            start: innerStart,
            end: innerEnd,
            orientation,
            curviness,
          })}
          fill="none"
          stroke={arrowColor}
          strokeDasharray={selected ? 5 : 0}
          strokeWidth={strokeWidth}
          markerEnd={`url(#${headId})`}
        />
      </svg>
    </span>
  );
};
