import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import React from "react";
import styled from "styled-components";
import { Template } from "../../state/template";

const TileWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: 240px;
  height: 140px;
  margin: 20px;
  border-radius: 0.5rem;
  background: #eee;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
`;

interface Props {
  template: Template;
  selectTemplate?: (template: Template) => void;
}

export const TemplateOption = ({ template, selectTemplate }: Props) => {
  if (!template) return null;
  const { icon: Icon, title, description } = template;
  return (
    <span
      onClick={() => selectTemplate && selectTemplate(template)}
      className={`-m-3 p-3 flex items-start  rounded-lg ${
        selectTemplate && "hover:bg-gray-50 cursor-pointer"
      } transition ease-in-out duration-150`}
    >
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
        <Icon />
      </div>
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </span>
  );
};
