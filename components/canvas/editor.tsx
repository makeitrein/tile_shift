import React, { useEffect, useState } from "react";
import { fromHtml } from "remirror/core";
import { BoldExtension } from "remirror/extension/bold";
import { RemirrorProvider, useManager, useRemirror } from "remirror/react";
import styled from "styled-components";

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

const EditorDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

const EditorInner = () => {
  // The `getRootProps` adds the ref to the div element below to inject the
  // ProseMirror dom. You have full control over where it should be placed.
  // The first call is the one that is used.
  const { getRootProps, focus } = useRemirror();

  useEffect(() => {
    focus("end"); // Autofocus to the end of the editor text when this component loads.
  }, []);

  return <EditorDiv {...getRootProps()} />;
};

const extensionTemplate = () => [new BoldExtension()];

export const Editor = () => {
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
      <Button />
      <EditorInner />
    </RemirrorProvider>
  );
};
