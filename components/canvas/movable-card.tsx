import * as React from "react";
import Moveable from "react-moveable";
import { useRemirror } from "remirror/react";
import { Editor } from "./editor";

export const editorID = (id: number) => `editor-${id}`;

const borderRadius = "104px 63px 47px 103px / 48.947px 77.053px 121.947px 68px";

export const MovableCard = ({ id, movableCards }) => {
  const [target, setTarget] = React.useState<HTMLElement>();
  const [elementGuidelines, setElementGuidelines] = React.useState([]);
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  const { focus } = useRemirror();

  const cardID = (id: number) => `card-${id}`;

  React.useEffect(() => {
    setElementGuidelines(
      movableCards.map((card) => document.getElementById(cardID(card.id)))
    );
    setTarget(document.getElementById(cardID(id)));
  }, []);
  return (
    <div>
      <div
        id={cardID(id)}
        style={{ borderRadius }}
        className="target movable-card"
      >
        <Editor id={id} />
      </div>
      <Moveable
        target={target}
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
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
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
        onClick={() => {}}
        onDragStart={({ set, inputEvent }) => {
          const editorEl = document.getElementById(editorID(id));
          if (editorEl.contains(inputEvent.target)) {
            set(frame.translate);
          } else {
            set(frame.translate);
          }
        }}
        onDrag={({ target, beforeTranslate }) => {
          frame.translate = beforeTranslate;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onDragEnd={(e) => {
          if (!e.isDrag && e.inputEvent.srcElement.click instanceof Function) {
            focus("end");
          }
        }}
      />
    </div>
  );
};
