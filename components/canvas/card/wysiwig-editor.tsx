import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { fromHtml } from "remirror/core";
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
import { canvasCard } from "../../state/canvas";
import { TooltipMenu } from "./tooltip-menu";

export const articlePadding = 12;

const EditableArticle = styled.article`
  padding: ${articlePadding}px;
  white-space: pre-line;
  outline: none;
  font-weight: 500;

  > div {
    cursor: text;
    outline: none;
  }

  p {
    font-size: 0.875rem;
    // line-height: 1.25rem;
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

  code {
    background: #eee;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
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
  const manager = useManager(extensionTemplate);

  // Store the editor value in a state variable.
  const [value, setValue] = useState(() =>
    // Use the `remirror` manager to create the state.
    manager.createState({
      content: "<p>This is the initial value</p>",
      stringHandler: fromHtml,
    })
  );

  // Add the value and change handler to the editor.
  return (
    <RemirrorProvider
      key={id}
      manager={manager}
      value={value}
      onChange={(parameter) => {
        // Update the state to the latest value.
        setValue(parameter.state);
      }}
    >
      <Editor id={id} showToolbar={showToolbar} />
    </RemirrorProvider>
  );
};

export const Editor = ({ id, showToolbar }) => {
  const { getRootProps } = useRemirror();
  const setCard = useSetRecoilState(canvasCard(id));

  const handleFocus = (isWysiwygFocused) => {
    setCard((card) => ({ ...card, isWysiwygFocused: true }));
  };

  const handleBlur = (isWysiwygFocused) => {
    // A bit awkward, but need to prevent backspace from deleting card while editor is focused
    setTimeout(
      () => setCard((card) => ({ ...card, isWysiwygFocused: false })),
      10
    );
  };

  return (
    <>
      {showToolbar && <TooltipMenu id={id} />}
      <EditableArticle
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ pointerEvents: !showToolbar && "none" }}
        {...getRootProps()}
      />
    </>
  );
};
