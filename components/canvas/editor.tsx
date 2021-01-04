import React, { useState } from "react";
import { fromHtml } from "remirror/core";
import { BoldExtension } from "remirror/extension/bold";
import { ItalicExtension } from "remirror/extension/italic";
import { UnderlineExtension } from "remirror/extension/underline";
import { CorePreset } from "remirror/preset/core";
import { RemirrorProvider, useManager, useRemirror } from "remirror/react";
import styled from "styled-components";
import { TooltipMenu } from "./menu";

const Button = () => {
  // `autoUpdate` means that every editor update will recalculate the output
  // from `active.bold()` and keep the bold status up to date in the editor.
  const { active, commands } = useRemirror({ autoUpdate: true });

  return (
    <>
      <button
        onClick={() => commands.toggleBold()}
        style={{ fontWeight: active.bold() ? "bold" : undefined }}
      >
        Bold
      </button>
    </>
  );
};

const EditableArticle = styled.article`
  padding: 12px;

  > div {
    cursor: text;
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
];

export const EditorManager = ({ children }) => {
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
      manager={manager}
      value={value}
      onChange={(parameter) => {
        // Update the state to the latest value.
        setValue(parameter.state);
      }}
    >
      {children}
    </RemirrorProvider>
  );
};

export const Editor = ({ id, showToolbar }) => {
  const { view } = useRemirror();

  console.log(view.hasFocus());

  return (
    <>
      {/* {showToolbar && view.hasFocus() && <TooltipMenu />} */}
      {showToolbar && <TooltipMenu />}
      <EditorInner showToolbar={showToolbar} id={id} />
    </>
  );
};
