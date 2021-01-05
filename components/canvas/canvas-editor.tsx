import Panzoom, { PanzoomObject } from "@panzoom/panzoom";
import * as React from "react";
import { useEffect, useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import styled from "styled-components";
import { CustomArrowable } from "./custom-arrowable";
import { Editor, EditorManager } from "./editor";
import { Button, ButtonGroup } from "./general/button";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
`;

const Canvas = styled.div`
  width: 400vw;
  height: 400vh;
  border: 10px solid blue;
`;

const SelectoArea = styled.div`
  width: 100%;
  height: 100%;
`;

const resizeTarget = (ev, frameMap) => {
  const target = ev.target;
  const article = target.querySelector("article");

  const minWidth = 140;
  const minHeight = article.offsetHeight;

  const frame = frameMap.get(ev.target);
  frame.translate = ev.drag.beforeTranslate;
  target.style.width = `${Math.max(minWidth, ev.width)}px`;
  target.style.height = `${Math.max(minHeight, ev.height)}px`;
  ev.target.style.transform = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`;
};

export default function CanvasEditor() {
  const [targets, setTargets] = React.useState([]);
  const [selectedCube, setSelectedCube] = React.useState(null);
  const [frameMap] = React.useState(() => new Map());

  const moveableRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const canvasEditorRef = React.useRef(null);
  const cubes = [];
  const panzoomRef = useRef<PanzoomObject>(null);
  const range = useRef<HTMLInputElement>(null);

  let panzoom = panzoomRef.current;

  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  for (let i = 0; i < 1; ++i) {
    cubes.push(i);
  }

  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(canvasEditorRef.current, {
      disablePan: true,
      canvas: true,
      contain: "outside",
      maxScale: 3,
      minScale: 0.3,
      // excludeClass: "cube",
      // startX: -window.outerWidth * 2,
      // startY: -window.outerHeight * 2,
      // startScale: 1.5,
      handleStartEvent: (event) => {
        if (Array.from(event.target.classList).includes("cube")) {
          throw "disable panning hack";
        }
      },
    });

    window.addEventListener(
      "mousewheel",
      (e) => {
        const isPinchZoom = e.ctrlKey;

        e.preventDefault();

        if (isPinchZoom) {
          panzoom.zoomWithWheel(e);
          if (range.current) range.current.value = panzoom.getScale() + "";
        } else {
          const x = -e.deltaX;
          const y = -e.deltaY;
          panzoom.pan(x, y, { relative: true, force: true });
        }
      },
      { passive: false }
    );
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      console.log(e);
      console.log(moveableRef.current);
      // moveableRef.current.updateRect();
      // moveableRef.current.request("draggable", { deltaX: 0, deltaY: 0 }, true);
      const articleHeight = e.target.offsetHeight;

      const rect = moveableRef.current.getRect();

      if (e.target.isContentEditable && rect.offsetHeight < articleHeight) {
        moveableRef.current.request("resizable", {
          offsetHeight: parseFloat(articleHeight),
          isInstant: true,
        });
      }
    });
  }, []);

  if (!process.browser) return null;

  console.log(targets && targets[0] && targets[0].id);

  const activeIds = targets.map((t) => t.id);

  const currentTarget = activeIds.length === 1 && activeIds[0];

  console.log(currentTarget);

  return (
    <Wrapper
      className="wrapper"
      onBlur={() => {
        console.log("blur");
        window.getSelection().removeAllRanges();
      }}
    >
      <div className="absolute bottom-4 right-4 z-1000">
        <ButtonGroup>
          <Button className="rounded-l-md">
            <input
              ref={range}
              onInput={(event) => {
                panzoom.zoomToPoint(
                  (event.target as HTMLInputElement).valueAsNumber,
                  {
                    clientX: window.innerWidth / 2,
                    clientY: window.innerHeight / 2,
                  }
                );
              }}
              onChange={(event) => {
                panzoom.zoomToPoint(
                  (event.target as HTMLInputElement).valueAsNumber,
                  {
                    clientX: window.innerWidth / 2,
                    clientY: window.innerHeight / 2,
                  }
                );
              }}
              className="range-input"
              type="range"
              min="0.3"
              max="3"
              step="0.1"
              defaultValue="1"
            />
          </Button>
          <Button
            className="-ml-px"
            onClick={() => {
              panzoom.zoomToPoint(panzoom.getScale() - 0.3, {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2,
              });
              if (range.current) range.current.value = panzoom.getScale() + "";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width={20}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
              />
            </svg>
          </Button>
          <Button
            className="-ml-px rounded-r-md"
            onClick={() => {
              panzoom.zoomToPoint(panzoom.getScale() + 0.3, {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2,
              });
              if (range.current) range.current.value = panzoom.getScale() + "";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={20}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </Button>
        </ButtonGroup>
      </div>
      <Selecto
        ref={selectoRef}
        dragContainer={".wrapper"}
        selectableTargets={[".cube"]}
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
          setSelectedCube(null);
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
      <Canvas ref={canvasEditorRef} className="canvas">
        <Moveable
          ref={moveableRef}
          ables={[CustomArrowable]}
          props={{
            editable: true,
            selectedCube,
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
          checkInput={true}
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
            setOrigin(["%", "%"]);
            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
              });
            }
            const frame = frameMap.get(target);
            dragStart && dragStart.set(frame.translate);
          }}
          onResize={(ev) => {
            resizeTarget(ev, frameMap);
          }}
          onResizeGroupStart={({ events, setMin }) => {
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
              resizeTarget(ev, frameMap);
            });
          }}
          onClickGroup={(e) => {
            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
          }}
          // onClick={(e) => {
          //   // if (selectedCube) {
          //   // const article = e.target.querySelector("article");
          //   // placeCaretAtEnd(article);
          //   // // } else {
          //   setSelectedCube(e.target);
          //   // setTimeout(() => setSelectedCube(false), 3000);
          //   // }
          // }}
          onDragStart={(e) => {
            const target = e.target;

            // if (selectedCube && e.inputEvent?.target?.isContentEditable) {
            //   return false;
            // }

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

            setSelectedCube(false);

            frame.translate = e.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
          }}
          onDragEnd={(e) => {
            // if (!e.isDrag && e.inputEvent.target.isContentEditable) {
            //   setSelectedCube(true);
            //   setTimeout(() => setSelectedCube(false), 300);
            // }
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

        {cubes.map((i) => (
          <div
            style={{ marginLeft: i * 50, marginTop: i * 50 }}
            id={i}
            className="cube target"
            key={i}
          >
            <EditorManager>
              <Editor id={i} showToolbar={currentTarget === String(i)} />
            </EditorManager>
            {/* <ContentEditableEditor disabled={false} /> */}
            {/* <ContentEditableEditor /> */}
          </div>
        ))}
      </Canvas>
    </Wrapper>
  );
}
