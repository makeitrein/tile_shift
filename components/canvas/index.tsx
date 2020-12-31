import * as React from "react";
import { MovableCard } from "./movable-card";

const movableCards = [{ id: 1 }, { id: 2 }, { id: 3 }];

export function Canvas() {
  const [target, setTarget] = React.useState();
  const [elementGuidelines, setElementGuidelines] = React.useState([]);

  return (
    <div className="container">
      {movableCards.map((card, i) => (
        <MovableCard movableCards={movableCards} {...card} key={card.id} />
      ))}
    </div>
  );
}
