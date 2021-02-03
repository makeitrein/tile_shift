import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import * as cardState from "../../state/cards";

export const useResetSearchedForTile = () => {
  const [searchedForTile, setSearchedForTile] = useRecoilState(
    cardState.searchedForTile
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
