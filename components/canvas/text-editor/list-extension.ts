import {
  convertCommand,
  NodeExtension,
  NodeExtensionSpec,
  NodeViewMethod,
} from "@remirror/core";
import { isElementDomNode } from "@remirror/core-utils";
import { CommandFunction } from "@remirror/pm";
import { InputRule, wrappingInputRule } from "prosemirror-inputrules";
import { Node as ProsemirrorNode, Schema } from "prosemirror-model";
import { liftListItem, sinkListItem } from "prosemirror-schema-list";
import { EditorState } from "prosemirror-state";
import { EditorView, NodeView } from "prosemirror-view";
import { toggleCheckboxList, toggleList } from "./list-commands";
import { splitListItem } from "./list-helper";

class ListItemView implements NodeView {
  public dom: HTMLElement;
  public contentDOM: HTMLElement;
  public schema: Schema;

  public constructor(
    node: ProsemirrorNode,
    view: EditorView<Schema>,
    getPos: () => number
  ) {
    this.dom = this.contentDOM = document.createElement("li");
    this.schema = view.state.schema;
    this.updateListItemClass(node);
  }

  public update(node: ProsemirrorNode) {
    if (node.type !== this.schema.nodes.rinoListItem) return false;
    this.updateListItemClass(node);
    return true;
  }

  private updateListItemClass(node: ProsemirrorNode) {
    const className = "selectable-list-item";
    const hasClass = this.contentDOM.classList.contains(className);
    const shouldHasClass =
      node.firstChild?.type === this.schema.nodes.rinoCheckbox;

    if (hasClass !== shouldHasClass) {
      shouldHasClass
        ? this.contentDOM.classList.add(className)
        : this.contentDOM.classList.remove(className);
    }
  }
}

export class RinoListItemExtension extends NodeExtension {
  static disableExtraAttributes = true;

  get name() {
    return "rinoListItem" as const;
  }

  createNodeSpec(): NodeExtensionSpec {
    return {
      content: "rinoCheckbox? paragraph block*",
      defining: true,
      parseDOM: [{ tag: "li" }],
      toDOM(node) {
        const shouldHasClass = node.firstChild?.type?.name === "rinoCheckbox";
        return ["li", { class: shouldHasClass && "selectable-list-item" }, 0];
      },
    };
  }

  createKeymap() {
    const schema = this.store.schema;
    const type = this.type;
    return {
      Enter: convertCommand(
        splitListItem(schema.nodes.paragraph, schema.nodes.rinoCheckbox, type)
      ),
      "Mod-[": convertCommand(liftListItem(type)),
      "Mod-]": convertCommand(sinkListItem(type)),
    };
  }

  createNodeViews = (): NodeViewMethod => {
    return (
      node: ProsemirrorNode,
      view: EditorView,
      getPos: boolean | (() => number)
    ) => {
      return new ListItemView(node, view, getPos as () => number);
    };
  };
}

export class RinoOrderedListExtension extends NodeExtension {
  static disableExtraAttributes = true;

  get name() {
    return "rinoOrderedList" as const;
  }

  createNodeSpec(): NodeExtensionSpec {
    return {
      content: "rinoListItem+",
      group: "block",
      parseDOM: [
        {
          tag: "ol",
        },
      ],
      toDOM(node) {
        return ["ol", 0];
      },
    };
  }

  createCommands() {
    return {
      /**
       * Toggle the bullet list.
       */
      toggleOrderedList: (): CommandFunction =>
        toggleList(this.type, this.store.schema.nodes.rinoListItem),
    };
  }

  createInputRules = (): InputRule[] => {
    return [
      wrappingInputRule(
        /^(\d+)\.\s$/,
        this.type,
        (match: string[]) => ({ order: +match[1] }),
        (match: string[], node: ProsemirrorNode) =>
          node.childCount + (node.attrs.order as number) == +match[1]
      ),
    ];
  };
}

export class RinoBulletListExtension extends NodeExtension {
  static disableExtraAttributes = true;

  get name() {
    return "rinoBulletList" as const;
  }

  createNodeSpec(): NodeExtensionSpec {
    return {
      content: "rinoListItem+",
      group: "block",
      parseDOM: [
        {
          tag: "ul",
        },
      ],
      toDOM(node) {
        return ["ul", 0];
      },
    };
  }

  createCommands() {
    return {
      /**
       * Toggle the bullet list.
       */
      toggleBulletList: (): CommandFunction =>
        toggleList(this.type, this.store.schema.nodes.rinoListItem),
      toggleCheckboxList: (): CommandFunction => {
        return toggleCheckboxList(
          this.type,
          this.store.schema.nodes.rinoListItem,
          this.store.schema.nodes.rinoCheckbox
        );
      },
    };
  }

  createInputRules = (): InputRule[] => {
    return [wrappingInputRule(/^\s*([-+*])\s$/, this.type)];
  };
}

export class RinoCheckboxExtension extends NodeExtension {
  static disableExtraAttributes = true;

  get name() {
    return "rinoCheckbox" as const;
  }

  createNodeSpec(): NodeExtensionSpec {
    return {
      defining: true,
      selectable: false,
      attrs: {
        checked: { default: false },
      },
      parseDOM: [
        {
          tag: "input[type=checkbox]",
          getAttrs: (dom) =>
            isElementDomNode(dom)
              ? { checked: dom.hasAttribute("checked") }
              : {},
        },
      ],
      toDOM(node) {
        const attrs: Record<string, string> = { type: "checkbox" };
        if (node.attrs.checked) attrs.checked = "";
        return ["input", attrs];
      },
    };
  }

  createInputRules = (): InputRule[] => {
    return [
      new InputRule(
        /^\[([ |x])\] $/,
        (state: EditorState, match, start, end) => {
          const $from = state.selection.$from;
          if (
            $from.depth >= 3 &&
            $from.node(-1).type.name === "rinoListItem" &&
            $from.node(-2).type.name === "rinoBulletList" &&
            $from.index(-1) === 0 // The cursor is at the first child (paragraph) of this list item.
          ) {
            const attrs = { checked: match[1] === "x" };
            const listItemPos = $from.before(-1);
            return state.tr
              .delete(start, end)
              .insert(listItemPos + 1, this.type.create(attrs));
          }
          return null;
        }
      ),
    ];
  };

  createNodeViews = (): NodeViewMethod => {
    /*
        https://discuss.prosemirror.net/t/how-to-update-the-value-of-an-input/2147
        > I think the nicest way to do this would be to define a node view that, when it detects
        > change/input events on its field, uses the `getPos` callback it was given on creation
        > to figure out where the field is, and dispatches the appropriate transaction.
        >
        > You can also use [`posAtDOM`](http://prosemirror.net/docs/ref/#view.EditorView.posAtDOM)
        > to go from the event’s `target` property to a document position, but when the node is
        > re-rendered (over which you don’t have control, without a node view), that’ll annoyingly
        > mess with focus and cursor position inside the field.
        */
    return (
      node: ProsemirrorNode,
      view: EditorView,
      getPos: boolean | (() => number)
    ): NodeView => {
      let checked = !!node.attrs.checked;
      const dom = document.createElement("input");
      dom.setAttribute("type", "checkbox");
      dom.onclick = () => {
        const pos = (getPos as () => number)();
        checked = !checked;
        view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, { checked }));
      };
      if (node.attrs.checked) dom.setAttribute("checked", "");
      return {
        dom,
        ignoreMutation: () => true,
      };
    };
  };
}
