import { PanelStack } from "@blueprintjs/core";
import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

const PanelStackWrapper = styled.div`
  .bp3-popover2 {
    // position: relative;
  }

  .bp3-panel-stack-header {
    display: none;
  }

  .bp3-panel-stack {
    // position: inherit;
  }

  .bp3-panel-stack-header {
    box-shadow: none !important;
    // margin-bottom 32px;
    // &:before {
    //   position: absolute;
    //   content: "";
    //   margin-top: 60px;
    //   left: 0;
    //   right: 0;
    //   height: 1px;
    //   background: black;
    // }
  }
`;

export function VariableHeightPanelStack({ initialPanel }) {
  const ref = useRef();
  const [height, setHeight] = useState(0);
  useLayoutEffect(calcualteHeight);

  return (
    <PanelStackWrapper
      ref={ref}
      className="transition-200ms"
      style={{ height: `${height}px` }}
    >
      <PanelStack
        className="h-full"
        initialPanel={initialPanel}
        onOpen={calcualteHeight}
        onClose={calcualteHeight}
      />
    </PanelStackWrapper>
  );

  // Called by PanelStack hooks and also on each render
  function calcualteHeight(panelAddedOrRemoved?: any) {
    if (!ref.current) return;
    const childrenSelector =
      ".bp3-panel-stack-view:not(.bp3-panel-stack-exit) > *";
    const contentHeight = sumChildrenHeights(ref.current, childrenSelector) + 1;

    // Conditionally setHeight to avoid infinite loop
    const triggeredByCallback = Boolean(panelAddedOrRemoved);
    const heightChanged = height !== contentHeight;
    if (triggeredByCallback || heightChanged) setHeight(contentHeight);
  }
}

function sumChildrenHeights(element: any, selector: string) {
  const nodeList = element.querySelectorAll(selector);
  const addHeights = (sum: number, el: any) =>
    sum + (!el ? 0 : el.clientHeight);
  return Array.prototype.slice.call(nodeList).reduce(addHeights, 0);
}
