import * as React from "react";
import { MovableCard } from "./movable-card";

export function Canvas() {
  const [target, setTarget] = React.useState();
  const [elementGuidelines, setElementGuidelines] = React.useState([]);

  return (
    <div className="container">
      <MovableCard />
      <MovableCard />
      <MovableCard />
      <MovableCard />
    </div>
  );
}
