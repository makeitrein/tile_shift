import { CodeMirrorExtension } from "@remirror/extension-codemirror5";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/meta"; // This must be imported.
import "codemirror/mode/yaml/yaml";
import React, { useCallback, useRef, useState } from "react";
import { MoveableInterface } from "react-moveable";
import { useRecoilState, useRecoilValue } from "recoil";
import { fromHtml, toHtml } from "remirror/core";
import { BoldExtension } from "remirror/extension/bold";
import { HeadingExtension } from "remirror/extension/heading";
import { ItalicExtension } from "remirror/extension/italic";
import { LinkExtension } from "remirror/extension/link";
import { UnderlineExtension } from "remirror/extension/underline";
import { WysiwygPreset } from "remirror/preset/wysiwyg";
import { RemirrorProvider, useManager } from "remirror/react";
import "remirror/styles/all.css";
import * as tileState from "../../state/tiles";
import { articlePadding, Editor, tileHeaderHeight } from "./editor";
import {
  RinoBulletListExtension,
  RinoCheckboxExtension,
  RinoListItemExtension,
  RinoOrderedListExtension,
} from "./list-extension";

// Create the codeMirror extension with an instance of the codemirror import.

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
  new CodeMirrorExtension({ CodeMirror }),
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
