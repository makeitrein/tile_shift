import * as React from "react";
import { MovableCard } from "./movable-card";

const movableCards = [{ key: 1 }, { key: 2 }, { key: 3 }];

export function Canvas() {
  const [target, setTarget] = React.useState();
  const [elementGuidelines, setElementGuidelines] = React.useState([]);

  const refs = React.useMemo(
    () =>
      Array.from({ length: movableCards.length }, () =>
        React.createRef<HTMLDivElement>()
      ),
    [movableCards]
  );

  console.log(refs);

  return (
    <div className="container">
      {movableCards.map((card, i) => (
        <MovableCard key={card.key} ref={refs[i]} />
      ))}
    </div>
  );
}
