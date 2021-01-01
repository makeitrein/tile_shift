import * as React from "react";
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
    </div>
  );
}
