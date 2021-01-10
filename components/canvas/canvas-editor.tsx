import Panzoom, { PanzoomObject } from "@panzoom/panzoom";
import * as React from "react";
import { useEffect, useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { canvasCards } from "../state/canvas";
import { CanvasCard, cardHeight, cardWidth } from "./card/canvas-card";
import { CustomArrowable } from "./card/custom-arrowable";
import { articlePadding } from "./card/wysiwig-editor";
import { ZoomControlToolbar } from "./zoom-control-toolbar";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(240, 242, 245);
`;

const Canvas = styled.div`
  width: 400vw;
  height: 400vh;
  // border: 10px solid #4af;
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
  const [cards, setCards] = useRecoilState(canvasCards);
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [disablePan, setDisablePan] = React.useState(true);
  const [draggingCardId, setDraggingCardId] = React.useState(null);
  const [frameMap] = React.useState(() => new Map());
  const [zoom, setZoom] = React.useState(1);

  const moveableRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const canvasEditorRef = React.useRef(null);
  const panzoomRef = useRef<PanzoomObject>(null);
  const range = useRef<HTMLInputElement>(null);

  let panzoom = panzoomRef.current;

  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(canvasEditorRef.current, {
      disablePan: disablePan,
      canvas: true,
      contain: "outside",
      maxScale: 3,
      minScale: 0.3,
      // excludeClass: "canvas-card",
      // startX: -window.outerWidth * 2,
      // startY: -window.outerHeight * 2,
      // startScale: 1.5,
      handleStartEvent: (event) => {
        if (
          !disablePan &&
          Array.from(event.target.classList).includes("canvas-card")
        ) {
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

    canvasEditorRef.current.addEventListener("panzoomzoom", ({ detail }) => {
      console.log(detail.scale);
      if (detail.scale < 0.5) {
        setZoom(2);
      } else if (detail.scale < 1) {
        setZoom(1.5);
      } else {
        setZoom(1);
      }
    });
  }, []);

  useEffect(() => {
    panzoom.setOptions({ disablePan: disablePan });
  }, [disablePan]);

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      console.log(e);
      console.log(moveableRef.current);
      // moveableRef.current.updateRect();
      // moveableRef.current.request("draggable", { deltaX: 0, deltaY: 0 }, true);
      const articleHeight = e.target.offsetHeight + articlePadding;

      const rect = moveableRef.current.getRect();

      if (e.target.isContentEditable && rect.offsetHeight <= articleHeight) {
        moveableRef.current.request("resizable", {
          offsetHeight: parseFloat(articleHeight) + articlePadding,
          isInstant: true,
        });
      }
    });
  }, []);

  if (!process.browser) return null;

  const selectedCardIds = selectedCards.map((t) => t.id);
  const onlySelectedCard = selectedCardIds.length === 1 && selectedCardIds[0];

  const addItem = (e) => {
    if (e.target !== canvasEditorRef.current) {
      return;
    }
    setCards((oldTodoList) => [
      ...oldTodoList,
      {
        id: Math.random(),
        x: e.nativeEvent.offsetX - cardWidth / 3,
        y: e.nativeEvent.offsetY - cardHeight / 2,
      },
    ]);
  };

  return (
    <Wrapper
      ref={wrapperRef}
      className="wrapper"
      onBlur={() => {
        console.log("blur");
        window.getSelection().removeAllRanges();
      }}
      onDoubleClick={addItem}
    >
      <ZoomControlToolbar
        disablePan={disablePan}
        toggleDisablePan={() => setDisablePan((pan) => !pan)}
        range={range}
        panzoom={panzoom}
      />

      {disablePan && (
        <Selecto
          ref={selectoRef}
          dragContainer={".wrapper"}
          selectableTargets={[".canvas-card"]}
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
              selectedCards.some((t) => t === target || t.contains(target))
            ) {
              e.stop();
            }
          }}
          onSelect={(e) => {
            setSelectedCards(e.selected);
            setDraggingCardId(null);
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
      )}
      <Canvas ref={canvasEditorRef} className="canvas">
        <Moveable
          ref={moveableRef}
          bounds={{
            left: 40,
            top: 40,
            right: window.innerWidth * 4 - 40,
            bottom: window.innerHeight * 4 - 40,
          }}
          ables={[CustomArrowable]}
          props={{
            customArrowable: true,
            onlySelectedCard: onlySelectedCard,
            draggingCardId,
          }}
          draggable={true}
          target={selectedCards}
          elementGuidelines={Array.from(
            document.querySelectorAll(".canvas-card")
          ).filter((el) => !selectedCardIds.includes(el.id))}
          snappable={true}
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
          //   // if (draggingCardId) {
          //   // const article = e.target.querySelector("article");
          //   // placeCaretAtEnd(article);
          //   // // } else {
          //   setDraggingCardId(e.target);
          //   // setTimeout(() => setDraggingCardId(false), 3000);
          //   // }
          // }}
          onDragStart={(e) => {
            const target = e.target;

            // if (draggingCardId && e.inputEvent?.target?.isContentEditable) {
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

            setDraggingCardId(e.target.id);

            frame.translate = e.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
          }}
          onDragEnd={(e) => {
            // if (!e.isDrag && e.inputEvent.target.isContentEditable) {
            //   setDraggingCardId(true);
            //   setTimeout(() => setDraggingCardId(false), 300);
            // }
            setDraggingCardId(null);
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

        {cards.map(({ id, x, y }) => (
          <CanvasCard
            x={x}
            y={y}
            key={id}
            id={id}
            isDragging={String(id) === draggingCardId}
            isOnlySelectedCard={String(id) === onlySelectedCard}
          />
        ))}
      </Canvas>
    </Wrapper>
  );
}
