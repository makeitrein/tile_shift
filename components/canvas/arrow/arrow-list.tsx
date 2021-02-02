import * as React from "react";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import { Arrow } from "./arrow";

export const ArrowList = React.memo(() => {
  const arrowIds = useRecoilValue(arrowState.arrowIds);

  return (
    <>
      {arrowIds.map((id) => (
        <Arrow key={id} id={id} />
      ))}
    </>
  );
});
