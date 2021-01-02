import Panzoom from "@panzoom/panzoom";
import * as React from "react";
import { useEffect } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { Editable } from "./custom-moveables";

export default function CanvasEditor() {
  const [targets, setTargets] = React.useState([]);
  const [frameMap] = React.useState(() => new Map());
  const moveableRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const canvasEditorRef = React.useRef(null);
  const cubes = [];

  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  for (let i = 0; i < 30; ++i) {
    cubes.push(i);
  }

  useEffect(() => {
    Panzoom(canvasEditorRef.current, {
      panOnlyWhenZoomed: true,
      handleStartEvent: (event) => {
        if (Array.from(event.target.classList).includes("cube")) {
          throw "disable panning hack";
        }
      },
    });
  }, []);

  if (!process.browser) return null;

  return (
    <div className="moveable app">
      <div ref={canvasEditorRef} className="container">
        <Moveable
          ref={moveableRef}
          ables={[Editable]}
          props={{
            editable: true,
          }}
          draggable={true}
          target={targets}
          elementGuidelines={Array.from(document.querySelectorAll(".cube"))}
          snappable={true}
          verticalGuidelines={[0, 200, 400]}
          horizontalGuidelines={[0, 200, 400]}
          snapThreshold={5}
          isDisplaySnapDigit={true}
          snapGap={true}
          snapElement={true}
          snapVertical={true}
          snapHorizontal={true}
          snapCenter={false}
          snapDigit={0}
          resizable={true}
          throttleDrag={0}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          onResizeStart={({ target, setOrigin, dragStart }) => {
            console.log("onResizeStart");
            setOrigin(["%", "%"]);
            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
              });
            }
            const frame = frameMap.get(target);
            dragStart && dragStart.set(frame.translate);
          }}
          onResize={({ target, width, height, drag }) => {
            const beforeTranslate = drag.beforeTranslate;

            const frame = frameMap.get(target);

            frame.translate = beforeTranslate;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
          onResizeGroupStart={({ events }) => {
            events.forEach((ev, i) => {
              if (!frameMap.has(ev.target)) {
                frameMap.set(ev.target, {
                  translate: [0, 0],
                });
              }
              const frame = frameMap.get(ev.target);
              ev.dragStart && ev.dragStart.set(frame.translate);
            });
          }}
          onResizeGroup={({ events }) => {
            events.forEach((ev, i) => {
              const frame = frameMap.get(ev.target);
              frame.translate = ev.drag.beforeTranslate;
              ev.target.style.width = `${ev.width}px`;
              ev.target.style.height = `${ev.height}px`;
              ev.target.style.transform = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`;
            });
          }}
          onClickGroup={(e) => {
            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
          }}
          onDragStart={(e) => {
            const target = e.target;

            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
              });
            }
            const frame = frameMap.get(target);

            e.set(frame.translate);
          }}
          onDrag={(e) => {
            const target = e.target;
            const frame = frameMap.get(target);

            frame.translate = e.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
          }}
          onDragGroupStart={(e) => {
            e.events.forEach((ev) => {
              const target = ev.target;

              if (!frameMap.has(target)) {
                frameMap.set(target, {
                  translate: [0, 0],
                });
              }
              const frame = frameMap.get(target);

              ev.set(frame.translate);
            });
          }}
          onDragGroup={(e) => {
            e.events.forEach((ev) => {
              const target = ev.target;
              const frame = frameMap.get(target);

              frame.translate = ev.beforeTranslate;
              target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
            });
          }}
        ></Moveable>
        <Selecto
          ref={selectoRef}
          dragContainer={".elements"}
          selectableTargets={[".selecto-area .cube"]}
          hitRate={0}
          selectByClick={true}
          selectFromInside={false}
          toggleContinueSelect={["shift"]}
          ratio={0}
          onDragStart={(e) => {
            const moveable = moveableRef.current;
            const target = e.inputEvent.target;
            if (
              moveable.isMoveableElement(target) ||
              targets.some((t) => t === target || t.contains(target))
            ) {
              e.stop();
            }
          }}
          onSelect={(e) => {
            setTargets(e.selected);
          }}
          onSelectEnd={(e) => {
            const moveable = moveableRef.current;
            if (e.isDragStart) {
              e.inputEvent.preventDefault();

              setTimeout(() => {
                moveable.dragStart(e.inputEvent);
              });
            }
          }}
        ></Selecto>

        <div className="elements selecto-area">
          {cubes.map((i) => (
            <div
              style={{ marginLeft: i * 50, marginTop: i * 50 }}
              id={`cube-${i}`}
              className="cube target"
              key={i}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
