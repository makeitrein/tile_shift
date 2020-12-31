import * as React from "react";
import Moveable from "react-moveable";

const borderRadius = "104px 63px 47px 103px / 48.947px 77.053px 121.947px 68px";

export const MovableCard = React.forwardRef(
  (props, moveRef: React.Ref<HTMLDivElement>) => {
    const [target, setTarget] = React.useState();
    const [elementGuidelines, setElementGuidelines] = React.useState([]);
    const [frame, setFrame] = React.useState({
      translate: [0, 0],
    });

    const ref = React.useRef();

    React.useEffect(() => {
      setElementGuidelines([
        // document.querySelector(".nested.rotate"),
      ]);
    }, []);
    return (
      <div>
        <div ref={moveRef} style={{ borderRadius }} className="target">
          Target
        </div>
        <Moveable
          target={moveRef.current}
          elementGuidelines={elementGuidelines}
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
          draggable={true}
          resizable={true}
          throttleDrag={0}
          startDragRotate={0}
          throttleDragRotate={0}
          zoom={1}
          origin={true}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          onDragStart={({ set }) => {
            set(frame.translate);
          }}
          onDrag={({ target, beforeTranslate }) => {
            frame.translate = beforeTranslate;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
          onResizeStart={({ setOrigin, dragStart }) => {
            setOrigin(["%", "%"]);
            dragStart && dragStart.set(frame.translate);
          }}
          onResize={({ target, width, height, drag }) => {
            const beforeTranslate = drag.beforeTranslate;

            frame.translate = beforeTranslate;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
        />
      </div>
    );
  }
);
