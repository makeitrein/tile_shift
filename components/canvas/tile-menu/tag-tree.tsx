/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ITreeNode, Tree } from "@blueprintjs/core";
import { FlagOutline } from "heroicons-react";
import * as React from "react";
import { Tag } from "./tag";

export interface ITreeExampleState {
  nodes: ITreeNode[];
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
export class TagTree extends React.Component<ITreeExampleState> {
  public state: ITreeExampleState = { nodes: INITIAL_STATE };

  public render() {
    return (
      <Tree
        contents={this.state.nodes}
        onNodeClick={this.handleNodeClick}
        onNodeCollapse={this.handleNodeCollapse}
        onNodeExpand={this.handleNodeExpand}
      />
    );
  }

  private handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, (n) => (n.isSelected = false));
    }
    nodeData.isSelected = false;

    nodeData.isExpanded = !nodeData.isExpanded;

    this.setState(this.state);
  };

  private handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  private handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }
}

const tags = {
  "Project Scoping": ["Proposal", "Goal", "Risk", "Solution", "Problem"],
  "Decision Making": ["Proposal", "Goal", "Risk", "Solution", "Problem"],
};

/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE: ITreeNode[] = Object.entries(tags).map(
  ([folderLabel, tags]) => {
    return {
      id: 1,
      icon: (
        <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 mr-2 rounded-md bg-blue-500 text-white ">
          <FlagOutline size={18} />
        </div>
      ),
      label: folderLabel,
      childNodes: tags.map((tagName, idx) => ({
        id: idx,

        label: <Tag className="ml-4" name={tagName} />,
      })),
    };
  }
);
