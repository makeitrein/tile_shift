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
  const cursorInnerRef = useRef(null);
  const [coords, setCoords] = useState({ x: null, y: null });

  let endX = useRef(0);
  let endY = useRef(0);

  // Primary Mouse Move event
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    cursorInnerRef.current.style.top = clientY - 90 + "px";
    cursorInnerRef.current.style.left = clientX - 250 + "px";
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
