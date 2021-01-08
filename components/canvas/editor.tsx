import React, { useState } from "react";
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
import { TooltipMenu } from "./menu";

export const articlePadding = 12;

const EditableArticle = styled.article`
  padding: ${articlePadding}px;
  white-space: pre-wrap;
  outline: none;

  > div {
    cursor: text;
    outline: none;
  }

  h2 {
    font-size: 1.75em;
  }

  li * {
    display: inline;
  }

  ul li p {
    margin-left: -6px;
  }

  blockquote {
    font-size: 1.75em;
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

const EditorInner = ({ showToolbar }) => {
  // The `getRootProps` adds the ref to the div element below to inject the
  // ProseMirror dom. You have full control over where it should be placed.
  // The first call is the one that is used.
  const { getRootProps, focus } = useRemirror();

  // useEffect(() => {
  //   if (selected === String(id)) {
  //     focus("end");
  //   }
  // }, [selected, id, focus]);

  return (
    <EditableArticle
      style={{ pointerEvents: !showToolbar && "none" }}
      {...getRootProps()}
    />
  );
};

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
  return showToolbar ? (
    <RemirrorProvider
      manager={manager}
      value={value}
      onChange={(parameter) => {
        // Update the state to the latest value.
        setValue(parameter.state);
      }}
    >
      <Editor id={id} showToolbar={showToolbar} />
    </RemirrorProvider>
  ) : (
    <EditableArticle
      dangerouslySetInnerHTML={{
        __html: toHtml({ node: value.doc, schema: value.schema }),
      }}
    />
  );
};

export const Editor = ({ id, showToolbar }) => {
  const { view } = useRemirror();

  console.log(view.hasFocus());

  return (
    <>
      {/* {showToolbar && view.hasFocus() && <TooltipMenu />} */}
      {showToolbar && <TooltipMenu id={id} />}
      <EditorInner showToolbar={showToolbar} id={id} />
    </>
  );
};
