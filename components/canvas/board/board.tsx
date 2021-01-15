import { PanzoomObject } from "@panzoom/panzoom";
import * as React from "react";
import { useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  selectedCanvasCardIds,
  selectedCanvasCards,
  useGetCard,
  useUpdateCard,
} from "../../state/canvas";
import { CanvasCardList } from "../card/canvas-card-list";
import { ZoomControlToolbar } from "../zoom-control-toolbar";
import { useAddCardViaClick } from "./use-add-card-via-click";
import { useDeleteCardsViaBackspace } from "./use-delete-cards-via-backspace";
import { useDeleteTextEffect } from "./use-deselect-text-effect";
import { useDragResizeCard } from "./use-drag-resize-card";
import { usePanzoomEffects } from "./use-panzoom-effects";
import { useResizeCardEffect } from "./use-resize-card-effect";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(240, 242, 245);
`;

const Canvas = styled.div`
  width: 400vw;
  height: 400vh;
`;

export const Board = () => {
  const [selectedCards, setSelectedCards] = useRecoilState(selectedCanvasCards);
  const selectedCardIds = useRecoilValue(selectedCanvasCardIds);
  const [disablePan, setDisablePan] = React.useState(true);
  const [zoom, setZoom] = React.useState(1);

  const moveableRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const canvasEditorRef = React.useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<PanzoomObject>(null);
  const range = useRef<HTMLInputElement>(null);

  useDeleteCardsViaBackspace();
  useResizeCardEffect(moveableRef.current);
  useDeleteTextEffect(selectedCardIds);

  let panzoom = panzoomRef.current;

  usePanzoomEffects({
    panzoom,
    panzoomRef,
    canvasEditorRef,
    disablePan,
    range,
  });

  const updateCard = useUpdateCard();
  const getCard = useGetCard();

  const dragResizeCard = useDragResizeCard();
  const addCardViaClick = useAddCardViaClick(canvasEditorRef.current);

  if (!process.browser) return null;

  return (
    <Wrapper
      ref={wrapperRef}
      className="wrapper"
      onDoubleClick={addCardViaClick}
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
        />
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
          draggable={true}
          target={selectedCards}
          elementGuidelines={Array.from(
            document.querySelectorAll(".canvas-card")
          ).filter((el) => !selectedCardIds.includes(el.id))}
          snappable={true}
          isDisplaySnapDigit={true}
          snapGap={true}
          checkInput={false}
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
            const { x, y } = getCard(target.id);
            dragStart && dragStart.set([x, y]);
          }}
          onResize={dragResizeCard}
          onResizeGroupStart={({ events, setMin }) => {
            events.forEach((ev) => {
              const { x, y } = getCard(ev.target.id);
              ev.dragStart && ev.dragStart.set([x, y]);
            });
          }}
          onResizeGroup={({ events }) => events.forEach(dragResizeCard)}
          onClickGroup={(e) => {
            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
          }}
          onDragStart={(ev) => {
            if (ev.inputEvent?.target?.isContentEditable) {
              return false;
            }

            const target = ev.target;

            const { x, y } = getCard(target.id);

            ev.set([x, y]);
          }}
          onDrag={(e) => {
            const target = e.target;

            const x = e.beforeTranslate[0];
            const y = e.beforeTranslate[1];

            updateCard(e.target.id, { x, y, isDragging: true });
            target.style.transform = `translate(${x}px, ${y}px)`;
          }}
          onDragEnd={(e) => {
            updateCard(e.target.id, { isDragging: false });
          }}
          onDragGroupStart={(e) => {
            e.events.forEach((ev) => {
              const target = ev.target;

              const { x, y } = getCard(target.id);
              ev.set([x, y]);
            });
          }}
          onDragGroup={(e) => {
            e.events.forEach((ev) => {
              const target = ev.target;

              const x = ev.beforeTranslate[0];
              const y = ev.beforeTranslate[1];

              updateCard(target.id, { x, y });
              target.style.transform = `translate(${x}px, ${y}px)`;
            });
          }}
        />

        <CanvasCardList />
      </Canvas>
    </Wrapper>
  );
};
