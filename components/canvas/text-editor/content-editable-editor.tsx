import React from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import * as cardState from "../../state/cards";

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
  const [card, setCard] = useRecoilState(cardState.cardContent(id));

  const handleChange = useRefCallback((evt) => {
    const content = evt.target.value;
    setCard((card) => ({
      ...card,
      content,
    }));
  }, []);

  const handleBlur = useRefCallback(() => {
    console.log(card.content);
  }, [card.content]);

  return (
    <ContentEditable
      tagName="article"
      html={card.content}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}
