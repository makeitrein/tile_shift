import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useRemirror } from "remirror/react";
import "remirror/styles/all.css";
import styled from "styled-components";
import * as tileState from "../../state/tiles";
import { TileMenu } from "../tile-menu/tile-menu";

// Create the codeMirror extension with an instance of the codemirror import.

export const articlePadding = 12;
export const tileHeaderHeight = 72;

export const EditableArticle = styled.article`
  margin: ${articlePadding / 2}px;
  padding: ${articlePadding / 2}px;

  white-space: pre-line;
  word-wrap: break-word;
  outline: none;
  font-weight: 500;
  position: relative;
  transition: 0.2s background;
  border-radius: 6px;

  > div {
    cursor: text;
    outline: none;
  }

  a {
    color: rgba(37, 99, 235);
  }

  p {
    font-size: 1.25rem;
    min-height: 1.5rem;
  }

  s {
    text-decoration: none;
    font-size: 2rem;
    line-height: 2.25rem;
    font-weight: 600;
  }

  li * {
    display: inline;
  }

  ul li p {
    margin-left: -6px;
  }

  // code {
  //   font-family: inherit !important;
  //   position: relative;
  //   background: rgba(234, 221, 6, 0.3);
  // }

  ol {
    list-style-type: decimal;
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
    --tw-space-x-reverse: 0;
    margin-right: calc(0.125rem * var(--tw-space-x-reverse));
    margin-left: calc(0.125rem * calc(1 - var(--tw-space-x-reverse)));
  }
`;

interface EditorProps {
  id: string;
  showToolbar: boolean;
}
export const Editor = React.memo(
  React.forwardRef<HTMLDivElement, EditorProps>(({ id, showToolbar }, ref) => {
    const { getRootProps } = useRemirror();
    const setTileSettings = useSetRecoilState(tileState.tileSettings(id));

    const setTileEditorFocus = useCallback(
      (isWysiwygEditorFocused: boolean) => {
        setTileSettings((settings) => ({
          ...settings,
          isWysiwygEditorFocused,
        }));
      },
      []
    );

    return (
      <>
        {showToolbar && <TileMenu id={id} />}
        <EditableArticle
          ref={ref}
          onFocus={() => setTileEditorFocus(true)}
          onBlur={() => setTileEditorFocus(false)}
          style={{ pointerEvents: !showToolbar && "none" }}
          {...getRootProps()}
        />
      </>
    );
  })
);
