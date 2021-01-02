import * as React from "react";
import Selecto from "react-selecto";
import { EditorManager } from "./editor";
import { MovableCard } from "./movable-card";

const movableCards = [{ id: 1 }, { id: 2 }, { id: 3 }];

export function Canvas() {
  return (
    <div className="container">
      {movableCards.map((card, i) => (
        <EditorManager key={card.id}>
          <MovableCard movableCards={movableCards} {...card} />
        </EditorManager>
      ))}
      {process.browser && (
        <Selecto
          // The container to add a selection element
          container={document.querySelector(".container")}
          // The area to drag selection element (default: container)
          dragContainer={window}
          // Targets to select. You can register a queryselector or an Element.
          selectableTargets={[".target"]}
          // Whether to select by click (default: true)
          selectByClick={true}
          // Whether to select from the target inside (default: true)
          selectFromInside={true}
          // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
          continueSelect={false}
          // Determines which key to continue selecting the next target via keydown and keyup.
          toggleContinueSelect={"shift"}
          // The container for keydown and keyup events
          keyContainer={window}
          // The rate at which the target overlaps the drag area to be selected. (default: 100)
          hitRate={100}
          onSelect={(e) => {
            e.added.forEach((el) => {
              el.classList.add("selected");
            });
            e.removed.forEach((el) => {
              el.classList.remove("selected");
            });
          }}
        />
      )}
    </div>
  );
}
