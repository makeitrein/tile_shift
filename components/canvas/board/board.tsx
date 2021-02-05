import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  useGetTileDimensions,
  useSetTileDimensions,
  useSetTileSettings,
} from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import { ArrowList } from "../arrow/arrow-list";
import { BoardControls } from "../board-controls/board-controls";
import { DiscussionDrawer } from "../discussion-slide-over/discussion-slide-over";
import { MiniMap } from "../minimap/minimap";
import { TileList } from "../tile/tile-list";
import { ZoomControlToolbar } from "../zoom-control-toolbar";
import { PanzoomObject } from "./panzoom/types";
import { useAddTileViaClick } from "./use-add-tile-via-click";
import { useDeleteTilesViaBackspace } from "./use-delete-tiles-via-backspace";
import { useDeleteTextEffect } from "./use-deselect-text-effect";
import { useDragResizeTile } from "./use-drag-resize-tile";
import { usePanzoomEffects } from "./use-panzoom-effects";
import { useResetSearchedForTile } from "./use-reset-searched-for";
import { useResizeTileEffect } from "./use-resize-tile-effect";
import { useShareMousePosition } from "./use-share-mouse-position";

export const totalCanvasPixelSize = 10000;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Canvas = styled.div`
  width: ${totalCanvasPixelSize}px;
  height: ${totalCanvasPixelSize}px;
`;

export const Board = () => {
  const [selectedTiles, setSelectedTiles] = useRecoilState(
    tileState.selectedTileTargets
  );
  const selectedTileIds = useRecoilValue(tileState.selectedTileIds);

  const [disablePan, setDisablePan] = React.useState(true);
  const [zoom, setZoom] = React.useState(1);

  const moveableRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<PanzoomObject>(null);
  const range = useRef<HTMLInputElement>(null);

  useDeleteTilesViaBackspace();
  useResizeTileEffect(moveableRef.current);
  useDeleteTextEffect(selectedTileIds);
  useResetSearchedForTile();
  useShareMousePosition(canvasRef);

  let panzoom = panzoomRef.current;

  usePanzoomEffects({
    panzoom,
    panzoomRef,
    canvasRef,
    disablePan,
    range,
  });

  const setTileDimensions = useSetTileDimensions();
  const setTileSettings = useSetTileSettings();
  const getTileDimensions = useGetTileDimensions();

  const dragResizeTile = useDragResizeTile();
  const addTileViaClick = useAddTileViaClick(canvasRef.current);

  const toggleDisablePan = useCallback(() => setDisablePan((pan) => !pan), [
    setDisablePan,
  ]);

  const selectoOnDragStart = useCallback(
    (e) => {
      const moveable = moveableRef.current;
      const target = e.inputEvent.target;

      if (
        target.id === "minimap" ||
        moveable.isMoveableElement(target) ||
        selectedTiles.some((t) => t === target || t.contains(target))
      ) {
        e.stop();
      }
    },
    [selectedTiles, moveableRef]
  );

  const selectoOnSelect = useCallback((e) => {
    setSelectedTiles(e.selected);
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
    const { x, y } = getTileDimensions(target.id);
    dragStart && dragStart.set([x, y]);
  }, []);

  const onResizeGroupStart = useCallback(({ events, setMin }) => {
    events.forEach((ev) => {
      const { x, y } = getTileDimensions(ev.target.id);
      ev.dragStart && ev.dragStart.set([x, y]);
    });
  }, []);

  const onResizeGroup = useCallback(
    ({ events }) => events.forEach(dragResizeTile),
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

    const { x, y } = getTileDimensions(target.id);
    setTileSettings(ev.target.id, { isDragging: true });

    ev.set([x, y]);
  }, []);

  const onDrag = useCallback((e) => {
    const target = e.target;

    const x = e.beforeTranslate[0];
    const y = e.beforeTranslate[1];

    setTileDimensions(e.target.id, { x, y });
    target.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const onDragEnd = useCallback((e) => {
    setTileSettings(e.target.id, { isDragging: false });
  }, []);

  const onDragGroupStart = useCallback((e) => {
    e.events.forEach((ev) => {
      const target = ev.target;

      const { x, y } = getTileDimensions(target.id);
      ev.set([x, y]);
    });
  }, []);

  const onDragGroup = useCallback((e) => {
    e.events.forEach((ev) => {
      const target = ev.target;

      const x = ev.beforeTranslate[0];
      const y = ev.beforeTranslate[1];

      setTileDimensions(target.id, { x, y });
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
            right: totalCanvasPixelSize - boundPadding,
            bottom: totalCanvasPixelSize - boundPadding,
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
        ? Array.from(document.querySelectorAll(".canvas-tile")).filter(
            (el) => !selectedTileIds.includes(el.id)
          )
        : [],
    [process.browser, selectedTileIds]
  );

  if (!process.browser) return null;

  return (
    <>
      <DiscussionDrawer panzoom={panzoomRef.current} />

      <Wrapper
        ref={wrapperRef}
        className="wrapper bg-tan"
        onDoubleClick={addTileViaClick}
      >
        <BoardControls
          disablePan={disablePan}
          toggleDisablePan={toggleDisablePan}
          panzoom={panzoomRef.current}
        />

        {disablePan && (
          <Selecto
            ref={selectoRef}
            dragContainer={".canvas"}
            selectableTargets={[".canvas-tile"]}
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
        <Canvas ref={canvasRef} className="canvas">
          <Moveable
            ref={moveableRef}
            // bounds={bounds}
            rootContainer={document.body}
            draggable={true}
            target={selectedTiles}
            elementGuidelines={elementGuidelines}
            snappable={true}
            snapGap={true}
            snapThreshold={2}
            isDisplaySnapDigit={true}
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
            onResize={dragResizeTile}
            onResizeGroupStart={onResizeGroupStart}
            onResizeGroup={onResizeGroup}
            onClickGroup={onClickGroup}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            onDragGroupStart={onDragGroupStart}
            onDragGroup={onDragGroup}
          />

          <TileList />
          <ArrowList />
        </Canvas>
        <MiniMap panzoom={panzoomRef.current} canvas={canvasRef.current} />
        <ZoomControlToolbar panzoom={panzoom} />
      </Wrapper>
    </>
  );
};
