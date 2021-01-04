import Panzoom from "@panzoom/panzoom";
import * as React from "react";
import { useEffect } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import styled from "styled-components";
import { CustomArrowable } from "./custom-arrowable";
import { Editor, EditorManager } from "./editor";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Canvas = styled.div`
  width: 500vw;
  height: 500vh;
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

  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  for (let i = 0; i < 30; ++i) {
    cubes.push(i);
  }

  useEffect(() => {
    const panzoom = Panzoom(canvasEditorRef.current, {
      disablePan: true,
      canvas: true,
      contain: "outside",
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

    window.addEventListener("wheel", (e) => {
      const x = -e.deltaX;
      const y = -e.deltaY;
      panzoom.pan(x, y, { relative: true, force: true });
    });
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
      onBlur={() => {
        console.log("blur");
        window.getSelection().removeAllRanges();
      }}
    >
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
        <Selecto
          ref={selectoRef}
          dragContainer={".canvas"}
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

        <SelectoArea className="elements selecto-area">
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
        </SelectoArea>
      </Canvas>
    </Wrapper>
  );
}
