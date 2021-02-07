import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fromHtml, toHtml } from "remirror/core";
import { BoldExtension } from "remirror/extension/bold";
import { HeadingExtension } from "remirror/extension/heading";
import { ItalicExtension } from "remirror/extension/italic";
import { LinkExtension } from "remirror/extension/link";
import { UnderlineExtension } from "remirror/extension/underline";
import { CorePreset } from "remirror/preset/core";
import { ListPreset } from "remirror/preset/list";
import { WysiwygPreset } from "remirror/preset/wysiwyg";
import { RemirrorProvider, useManager, useRemirror } from "remirror/react";
import "remirror/styles/all.css";
import styled from "styled-components";
import * as tileState from "../../state/tiles";
import { TileMenu } from "../tile-menu/tile-menu";

export const articlePadding = 12;

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
    font-size: 1rem;
    min-height: 1.5rem;
  }

  h2 {
    line-height: 1.5rem;
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: inherit;
  }

  li * {
    display: inline;
  }

  ul li p {
    margin-left: -6px;
  }

  s {
    text-decoration: none;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
  }

  code {
    font-family: inherit !important;
    position: relative;
    background: rgba(234, 221, 6, 0.3);
  }

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

const extensionTemplate = () => [
  new CorePreset({}),
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new ListPreset({}),
  new HeadingExtension({}),
  new LinkExtension({ extraAttributes: { target: "_blank" } }),
  new WysiwygPreset({}),
];

export const EditorManager = ({ id, showToolbar }) => {
  const [tile, setTile] = useRecoilState(tileState.tileContent(id));
  const manager = useManager(extensionTemplate);
  const editableTileId = useRecoilValue(tileState.editableTileId);
  const tileSettings = useRecoilValue(tileState.tileSettings(id));

  const isEditable = editableTileId === id && !tileSettings.isDragging;

  const [value, setValue] = useState(
    manager.createState({
      content: tile.content || "",
      stringHandler: fromHtml,
    })
  );

  // Add the value and change handler to the editor.
  return (
    <RemirrorProvider
      key={id}
      manager={manager}
      value={value}
      placeholder="What's the context behind this decision? TODO: make tag specific"
      onChange={({ state }) => {
        setValue(state);
        setTile((tile) => ({
          ...tile,
          content: toHtml({ node: state.doc, schema: state.schema }),
        }));
      }}
    >
      <Editor id={id} showToolbar={true} />
    </RemirrorProvider>
  );
};

export const Editor = ({ id, showToolbar }) => {
  const { getRootProps } = useRemirror();
  const setTileSettings = useSetRecoilState(tileState.tileSettings(id));

  const setTileEditorFocus = (isWysiwygEditorFocused: boolean) => {
    setTileSettings((settings) => ({ ...settings, isWysiwygEditorFocused }));
  };

  return (
    <>
      {showToolbar && <TileMenu id={id} />}
      <EditableArticle
        onFocus={() => setTileEditorFocus(true)}
        onBlur={() => setTileEditorFocus(false)}
        style={{ pointerEvents: !showToolbar && "none" }}
        {...getRootProps()}
      />
    </>
  );
};
