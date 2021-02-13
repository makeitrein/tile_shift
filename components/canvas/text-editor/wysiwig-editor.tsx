import React, { useCallback, useRef, useState } from "react";
import { MoveableInterface } from "react-moveable";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fromHtml, toHtml } from "remirror/core";
import { BoldExtension } from "remirror/extension/bold";
import { HeadingExtension } from "remirror/extension/heading";
import { ItalicExtension } from "remirror/extension/italic";
import { LinkExtension } from "remirror/extension/link";
import { UnderlineExtension } from "remirror/extension/underline";
import { WysiwygPreset } from "remirror/preset/wysiwyg";
import { RemirrorProvider, useManager, useRemirror } from "remirror/react";
import "remirror/styles/all.css";
import styled from "styled-components";
import * as tileState from "../../state/tiles";
import { TileMenu } from "../tile-menu/tile-menu";
import {
  RinoBulletListExtension,
  RinoCheckboxExtension,
  RinoListItemExtension,
  RinoOrderedListExtension,
} from "./list-extension";

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
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new HeadingExtension({}),
  new LinkExtension({ extraAttributes: { target: "_blank" } }),
  new WysiwygPreset({}),
  new RinoOrderedListExtension({}),
  new RinoBulletListExtension({}),
  new RinoListItemExtension({}),
  new RinoCheckboxExtension({}),
];

interface Props {
  moveable: MoveableInterface;
  id: string;
}

export const EditorManager = React.memo(({ id, moveable }: Props) => {
  const [tile, setTile] = useRecoilState(tileState.tileContent(id));
  const manager = useManager(extensionTemplate);
  const editableTileId = useRecoilValue(tileState.editableTileId);
  const tileSettings = useRecoilValue(tileState.tileSettings(id));
  const editorRef = useRef(null);
  const isEditable = editableTileId === id && !tileSettings.isDragging;

  const [value, setValue] = useState(
    manager.createState({
      content: tile.content || "",
      stringHandler: fromHtml,
    })
  );

  const handleRemirrorChange = useCallback(
    ({ state, view }) => {
      console.log("hihihihihihi");
      const target = view.dom as HTMLDivElement;
      const articleHeight =
        target.offsetHeight + articlePadding + tileHeaderHeight;

      const rect = moveable.getRect();
      const extraSpacing = 12;

      if (articleHeight + extraSpacing >= rect.offsetHeight) {
        moveable.request("resizable", {
          offsetHeight: articleHeight + articlePadding,
          isInstant: true,
        });
      }

      setValue(state);
      setTile((tile) => ({
        ...tile,
        content: toHtml({ node: state.doc, schema: state.schema }),
      }));
    },

    []
  );

  // Add the value and change handler to the editor.
  return (
    <RemirrorProvider
      key={id}
      manager={manager}
      value={value}
      placeholder="What's on your mind?"
      onChange={handleRemirrorChange}
    >
      <Editor ref={editorRef} id={id} showToolbar={true} />
    </RemirrorProvider>
  );
});

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
