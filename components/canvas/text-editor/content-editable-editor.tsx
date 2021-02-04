import React from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import * as tileState from "../../state/tiles";

const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList
): ((...args: T) => void) => {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, deps ?? [value]);

  const result = React.useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);

  return result;
};

export function ContentEditableEditor({ id }) {
  const [tile, setTile] = useRecoilState(tileState.tileContent(id));

  const handleChange = useRefCallback((evt) => {
    const content = evt.target.value;
    setTile((tile) => ({
      ...tile,
      content,
    }));
  }, []);

  const handleBlur = useRefCallback(() => {}, [tile.content]);

  return (
    <ContentEditable
      tagName="article"
      html={tile.content}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}
