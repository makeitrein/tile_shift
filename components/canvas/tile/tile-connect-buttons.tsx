import React from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";
import { ConnectButton } from "./connect-button";

interface TileProps {
  id: string;
}

export const TileConnectButtons = React.memo(({ id }: TileProps) => {
  const editableTileId = useRecoilValue(tileState.editableTileId);

  const isEditable = id === editableTileId;
  return isEditable ? (
    <>
      <ConnectButton id={id} direction="top" />
      <ConnectButton id={id} direction="right" />
      <ConnectButton id={id} direction="left" />
      <ConnectButton id={id} direction="bottom" />
    </>
  ) : null;
});
