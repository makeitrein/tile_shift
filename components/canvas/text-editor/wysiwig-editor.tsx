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
import styled from "styled-components";
import * as cardState from "../../state/cards";
import { CardMenu } from "../card-menu/card-menu";

export const articlePadding = 12;

export const EditableArticle = styled.article`
  padding: ${articlePadding}px;
  white-space: pre-line;
  word-wrap: break-word;
  outline: none;
  font-weight: 500;
  position: relative;

  > div {
    cursor: text;
    outline: none;
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
    font-size: 1.5rem;
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
  new LinkExtension({}),
  new WysiwygPreset({}),
];

export const EditorManager = ({ id, showToolbar }) => {
  const [card, setCard] = useRecoilState(cardState.cardContent(id));
  const manager = useManager(extensionTemplate);
  const editableCardId = useRecoilValue(cardState.editableCardId);
  const cardSettings = useRecoilValue(cardState.cardSettings(id));

  const isEditable = editableCardId === id && !cardSettings.isDragging;

  const [value, setValue] = useState(
    manager.createState({
      content: card.content || "",
      stringHandler: fromHtml,
    })
  );

  // Add the value and change handler to the editor.
  return (
    <RemirrorProvider
      key={id}
      manager={manager}
      value={value}
      onChange={({ state }) => {
        setValue(state);
        setCard((card) => ({
          ...card,
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
  const setCardSettings = useSetRecoilState(cardState.cardSettings(id));

  const setCardEditorFocus = (isWysiwygEditorFocused: boolean) => {
    setCardSettings((settings) => ({ ...settings, isWysiwygEditorFocused }));
  };

  return (
    <>
      {showToolbar && <CardMenu id={id} />}
      <EditableArticle
        onFocus={() => setCardEditorFocus(true)}
        onBlur={() => setCardEditorFocus(false)}
        style={{ pointerEvents: !showToolbar && "none" }}
        {...getRootProps()}
      />
    </>
  );
};
