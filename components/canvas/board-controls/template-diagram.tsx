import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import React from "react";
import { LineOrientation } from "react-simple-arrows";
import { useRecoilValue } from "recoil";
import * as templateState from "../../state/template";
import { BasicArrowSvg } from "../react-simple-arrows/ArrowSvg/BasicArrowSvg";
import { Tag } from "../tile-menu/tag-picker";

export const TemplateDiagram = React.memo(() => {
  const selectedTemplate = useRecoilValue(templateState.selectedTemplate);

  if (!selectedTemplate) return null;

  const { tags, arrows } = selectedTemplate();

  return (
    <>
      <div className="relative bg-white px-5">
        {Object.entries(tags).map(([id, { name, x, y }]) => {
          return (
            <Tag
              key={id}
              name={name}
              className="absolute z-10"
              style={{ top: y, left: x }}
            />
          );
        })}

        {arrows.map(([startId, endId]) => {
          const startTag = tags[startId];
          const endTag = tags[endId];
          const xStartNudge = 80;
          const yStartNudge = 10;
          const xEndNudge = -5;
          const yEndNudge = 10;
          return (
            <BasicArrowSvg
              key={[startId, endId].toString()}
              start={{
                x: startTag.x + xStartNudge,
                y: startTag.y + yStartNudge,
              }}
              end={{ x: endTag.x + xEndNudge, y: endTag.y + yEndNudge }}
              orientation={LineOrientation.HORIZONTAL}
            />
          );
        })}
      </div>
    </>
  );
});
