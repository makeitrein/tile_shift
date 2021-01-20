import { PanzoomObject } from "@panzoom/panzoom";
import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import * as cardState from "../../state/cards";
import {
  useGetCardDimensions,
  useSetCardDimensions,
  useSetCardSettings,
} from "../../state/utils";
import { CanvasCardList } from "../card/canvas-card-list";
import { useAddCardViaClick } from "./use-add-card-via-click";
import { useDeleteCardsViaBackspace } from "./use-delete-cards-via-backspace";
import { useDeleteTextEffect } from "./use-deselect-text-effect";
import { useDragResizeCard } from "./use-drag-resize-card";
import { usePanzoomEffects } from "./use-panzoom-effects";
import { useResizeCardEffect } from "./use-resize-card-effect";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(243, 240, 231);
`;

const Canvas = styled.div`
  width: 1000vw;
  height: 1000vh;
`;

export const Board = () => {
  const [selectedCards, setSelectedCards] = useRecoilState(
    cardState.selectedCardTargets
  );
  const selectedCardIds = useRecoilValue(cardState.selectedCardIds);
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

  const setCardDimensions = useSetCardDimensions();
  const setCardSettings = useSetCardSettings();
  const getCardDimensions = useGetCardDimensions();

  const dragResizeCard = useDragResizeCard();
  const addCardViaClick = useAddCardViaClick(canvasEditorRef.current);

  const selectoOnDragStart = useCallback(
    (e) => {
      const moveable = moveableRef.current;
      const target = e.inputEvent.target;
      if (
        moveable.isMoveableElement(target) ||
        selectedCards.some((t) => t === target || t.contains(target))
      ) {
        e.stop();
      }
    },
    [selectedCards, moveableRef]
  );

  const selectoOnSelect = useCallback((e) => {
    setSelectedCards(e.selected);
  }, []);

  const selectoOnSelectEnd = useCallback(
    (e) => {
      const moveable = moveableRef.current;
      if (e.isDragStart) {
        e.inputEvent.preventDefault();

        setTimeout(() => {
          moveable.dragStart(e.inputEvent);
        });
      }
    },
    [moveableRef]
  );

  const onResizeStart = useCallback(({ target, setOrigin, dragStart }) => {
    setOrigin(["%", "%"]);
    const { x, y } = getCardDimensions(target.id);
    dragStart && dragStart.set([x, y]);
  }, []);

  const onResizeGroupStart = useCallback(({ events, setMin }) => {
    events.forEach((ev) => {
      const { x, y } = getCardDimensions(ev.target.id);
      ev.dragStart && ev.dragStart.set([x, y]);
    });
  }, []);

  const onResizeGroup = useCallback(
    ({ events }) => events.forEach(dragResizeCard),
    []
  );

  const onClickGroup = useCallback(
    (e) => {
      selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
    },
    [selectoRef]
  );

  const onDragStart = useCallback((ev) => {
    const target = ev.target;

    const { x, y } = getCardDimensions(target.id);
    setCardSettings(ev.target.id, { isDragging: true });

    ev.set([x, y]);
  }, []);

  const onDrag = useCallback((e) => {
    const target = e.target;

    const x = e.beforeTranslate[0];
    const y = e.beforeTranslate[1];

    setCardDimensions(e.target.id, { x, y });
    target.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const onDragEnd = useCallback((e) => {
    setCardSettings(e.target.id, { isDragging: false });
  }, []);

  const onDragGroupStart = useCallback((e) => {
    e.events.forEach((ev) => {
      const target = ev.target;

      const { x, y } = getCardDimensions(target.id);
      ev.set([x, y]);
    });
  }, []);

  const onDragGroup = useCallback((e) => {
    e.events.forEach((ev) => {
      const target = ev.target;

      const x = ev.beforeTranslate[0];
      const y = ev.beforeTranslate[1];

      setCardDimensions(target.id, { x, y });
      target.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, []);

  const boundPadding = 100;
  const bounds = useMemo(
    () =>
      process.browser
        ? {
            left: boundPadding,
            top: boundPadding,
            right: window.innerWidth * 10 - boundPadding,
            bottom: window.innerHeight * 10 - boundPadding,
          }
        : {},
    [process.browser]
  );

  const moveablePadding = useMemo(
    () => ({ left: 0, top: 0, right: 0, bottom: 0 }),
    []
  );

  const elementGuidelines = useMemo(
    () =>
      process.browser
        ? Array.from(document.querySelectorAll(".canvas-card")).filter(
            (el) => !selectedCardIds.includes(el.id)
          )
        : [],
    [process.browser, selectedCardIds]
  );

  if (!process.browser) return null;

  return (
    <Wrapper
      ref={wrapperRef}
      className="wrapper"
      onDoubleClick={addCardViaClick}
    >
      {/* <ZoomControlToolbar
        disablePan={disablePan}
        toggleDisablePan={() => setDisablePan((pan) => !pan)}
        range={range}
        panzoom={panzoom}
      /> */}

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
          onDragStart={selectoOnDragStart}
          onSelect={selectoOnSelect}
          onSelectEnd={selectoOnSelectEnd}
        />
      )}
      <Canvas ref={canvasEditorRef} className="canvas">
        <Moveable
          ref={moveableRef}
          // renderDirections={["nw", "ne", "se", "sw"]}
          bounds={bounds}
          draggable={true}
          target={selectedCards}
          elementGuidelines={elementGuidelines}
          snappable={true}
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
          padding={moveablePadding}
          onResizeStart={onResizeStart}
          onResize={dragResizeCard}
          onResizeGroupStart={onResizeGroupStart}
          onResizeGroup={onResizeGroup}
          onClickGroup={onClickGroup}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onDragGroupStart={onDragGroupStart}
          onDragGroup={onDragGroup}
        />

        <CanvasCardList />
      </Canvas>
    </Wrapper>
  );
};
