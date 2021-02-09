import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import React, { useCallback, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useEventListener } from "../../general/hooks/useEventListener";
import * as templateState from "../../state/template";
import { TemplateDiagram } from "./template-diagram";

export const InjectTemplateCursor = ({ canvasEditor }) => {
  const selectedTemplate = useRecoilValue(templateState.selectedTemplateId);

  return selectedTemplate.replaceCursor ? (
    <TempateCursor canvasEditor={canvasEditor} />
  ) : null;
};

export const TempateCursor = ({ canvasEditor }) => {
  const selectedTemplate = useRecoilValue(templateState.selectedTemplate);
  const cursorInnerRef = useRef(null);
  const [coords, setCoords] = useState({ x: null, y: null });

  let endX = useRef(0);
  let endY = useRef(0);

  const { tags, focalTagId } = selectedTemplate();

  const focalTag = tags[focalTagId];
  const { x, y } = focalTag;

  const nudgeY = -10;
  const nudgeX = 4;

  // Primary Mouse Move event
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    cursorInnerRef.current.style.left = clientX + "px";
    cursorInnerRef.current.style.top = clientY + "px";
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  useEventListener("mousemove", onMouseMove);

  return coords.x && coords.y ? (
    <div className="absolute" ref={cursorInnerRef}>
      <TemplateDiagram />
    </div>
  ) : null;
};
