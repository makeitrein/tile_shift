import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import * as tileState from "../../state/tiles";

export const useResetSearchedForTile = () => {
  const [searchedForTile, setSearchedForTile] = useRecoilState(
    tileState.searchedForTile
  );

  const timeoutRef = useRef();

  useEffect(() => {
    if (searchedForTile) {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setSearchedForTile(null);
      }, 5000);
    }
  }, [searchedForTile]);
};
