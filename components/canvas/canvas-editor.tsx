import Panzoom from "@panzoom/panzoom";
import dynamic from "next/dynamic";
import * as React from "react";
import { useEffect } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { ContentEditableEditor } from "./content-editable";
import { CustomArrowable } from "./custom-arrowable";

const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });

const Paragraph = dynamic(() => import("@editorjs/paragraph"), { ssr: false });

function placeCaretAtEnd(el) {
  el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

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
  const [isEditable, setIsEditable] = React.useState(false);
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

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      console.log(e);
      console.log(moveableRef.current);
      // moveableRef.current.updateRect();
      // moveableRef.current.request("draggable", { deltaX: 0, deltaY: 0 }, true);
      const articleHeight = e.target.offsetHeight;
      const rect = moveableRef.current.getRect();

      if (rect.offsetHeight < articleHeight) {
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

  return (
    <div
      className="moveable app"
      onBlur={() => {
        console.log("blur");
        window.getSelection().removeAllRanges();

        setIsEditable(false);
      }}
    >
      <div ref={canvasEditorRef} className="canvas">
        <Moveable
          ref={moveableRef}
          ables={[CustomArrowable]}
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
          // checkInput={isEditable}
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
          onClick={(e) => {
            // if (isEditable) {
            const article = e.target.querySelector("article");
            placeCaretAtEnd(article);
            // } else {
            // setIsEditable(true);
            // setTimeout(() => setIsEditable(false), 3000);
            // }
          }}
          onDragStart={(e) => {
            const target = e.target;

            // if (isEditable && e.inputEvent?.target?.isContentEditable) {
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

            frame.translate = e.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
          }}
          onDragEnd={(e) => {
            // if (!e.isDrag && e.inputEvent.target.isContentEditable) {
            //   setIsEditable(true);
            //   setTimeout(() => setIsEditable(false), 300);
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
              id={i}
              className="cube target"
              key={i}
            >
              {/* <EditorManager>
                <Editor selected={selected} id={i} />
              </EditorManager> */}
              <ContentEditableEditor disabled={false} />
              {/* <ContentEditableEditor /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
