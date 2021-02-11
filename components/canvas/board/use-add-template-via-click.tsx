import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCreateInitialArrow } from "../../state/arrow-utils";
import { generateTileId } from "../../state/db";
import * as templateState from "../../state/template";
import { useCreateInitialTile } from "../../state/tile-utils";

export const useAddTemplateViaClick = (canvasEditor) => {
  const [selectedTemplateId, setSelectedTemplateId] = useRecoilState(
    templateState.selectedTemplateId
  );

  const selectedTemplate = useRecoilValue(templateState.selectedTemplate);

  const createInitialTile = useCreateInitialTile();
  const createInitialArrow = useCreateInitialArrow();

  return useCallback(
    (e: React.MouseEvent) => {
      if (!selectedTemplateId.replaceCursor) {
        return;
      }

      const isCanvas = e.target === canvasEditor;
      if (!isCanvas) {
        return;
      }

      const clickX = e.nativeEvent.offsetX;
      const clickY = e.nativeEvent.offsetY;

      const { tags, arrows, focalTagId } = selectedTemplate({
        x: clickX,
        y: clickY,
        multiplier: 5,
      });

      const focalTag = tags[focalTagId];
      const focalTagX = focalTag.x + clickX;
      const focalTagY = focalTag.y + clickY;

      const random = Math.random();

      const tagIdToDbIdMap = Object.keys(tags).reduce((acc, tagId) => {
        acc[tagId] = generateTileId();
        return acc;
      }, {});

      {
        Object.entries(tags).map(([id, { name, x, y }]) => {
          createInitialTile({
            id: tagIdToDbIdMap[id],
            dimensions: {
              x: x,
              y: y,
              width: 100,
              height: 20,
            },
            tags: [name],
            collapsed: true,
          });
        });
      }

      arrows.forEach(([startId, endId]) =>
        createInitialArrow({
          start: {
            tileId: tagIdToDbIdMap[startId],
            point: "right",
          },
          end: { tileId: tagIdToDbIdMap[endId], point: "left" },
        })
      );

      setSelectedTemplateId({ templateId: null, replaceCursor: null });
    },
    [selectedTemplate, selectedTemplateId.replaceCursor, canvasEditor]
  );
};
