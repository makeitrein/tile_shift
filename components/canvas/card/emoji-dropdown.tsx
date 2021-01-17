import { usePositioner } from "@remirror/react-hooks";
import { useEditorFocus } from "@remirror/react-hooks/use-editor-focus";
import { cx } from "linaria";
import { Type, useMultishift } from "multishift";
import React, { FC, useCallback, useState } from "react";
import { isEmptyArray } from "remirror/core";
import styled from "styled-components";
import { useEmoji } from "./use-emoji";

export const EmojiSuggestionsItemStyles = styled.div`
  padding: 2px 8px;
  width: 30px;
  border-radius: 8px;

  color: white;
  &.hovered {
    background-color: black;
  }
  &.highlighted {
    background-color: var(--remirror-hue-gray-3);
  }
`;

export const EmojiSuggestionsDropdownWrapperStyles = styled.div`
  position: absolute;
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  padding-top: 8px;
  z-index: 10000;
  padding: 8px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: hsla(205, 70%, 15%, 0.25) 0 4px 8px,
    hsla(205, 70%, 15%, 0.31) 0px 0px 1px;
  background-color: white;
  max-height: 250px;
  max-width: 260px;
  overflow-y: auto;
`;

export const SocialEmojiComponent: FC = () => {
  const [state, setState] = useEmoji();
  const [isFocused, focus] = useEditorFocus();
  const [isClicking, setIsClicking] = useState(false);
  const { ref, active, bottom, left } = usePositioner(
    "popup",
    state && !isEmptyArray(state.list)
  );

  const {
    getMenuProps,
    getItemProps,
    itemHighlightedAtIndex,
    hoveredIndex,
  } = useMultishift({
    highlightedIndexes: [state?.index ?? 0],
    type: Type.ControlledMenu,
    items: state?.list ?? [],
    isOpen: true,
  });

  const onMouseDown = useCallback(() => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 2000);
  }, []);

  return (
    <EmojiSuggestionsDropdownWrapperStyles
      {...getMenuProps({ ref })}
      style={{
        top: bottom,
        left: left,
      }}
    >
      {active &&
        (state?.list ?? []).map((emoji, index) => {
          const isHighlighted = itemHighlightedAtIndex(index);
          const isHovered = index === hoveredIndex;

          return (
            <EmojiSuggestionsItemStyles
              key={emoji.name}
              className={cx(
                isHighlighted && "highlighted",
                isHovered && "hovered"
              )}
              {...getItemProps({
                onClick: () => {
                  state?.command(emoji);
                  focus();
                  setState(null);
                },
                item: emoji,
                index,
              })}
            >
              <EmojiSuggestionsItemName>{emoji.char}</EmojiSuggestionsItemName>
              {/* <EmojiSuggestionsItemChar>{emoji.name}</EmojiSuggestionsItemChar> */}
            </EmojiSuggestionsItemStyles>
          );
        })}
    </EmojiSuggestionsDropdownWrapperStyles>
  );
};

const EmojiSuggestionsItemName = styled.span`
  color: rgb(121, 129, 134);
`;

const EmojiSuggestionsItemChar = styled.span`
  font-size: 1.25em;
  padding-right: 5px;
`;
