import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { ArrowLeftOutline, TemplateOutline } from "heroicons-react";
import React from "react";
import { LineOrientation } from "react-simple-arrows";
import { useCreateInitialTile } from "../../state/tile-utils";
import { BasicArrowSvg } from "../react-simple-arrows/ArrowSvg/BasicArrowSvg";
import { Tag } from "../tile-menu/tag-picker";
import { Template, TemplateOption } from "./template-option";

interface Props {
  selectedTemplate: Template;
  goBack: () => void;
}

export const TemplatePreview = React.memo(
  ({ selectedTemplate, goBack }: Props) => {
    if (!selectedTemplate) return null;

    const { title, tags, description, arrows, icon: Icon } = selectedTemplate;
    const createIniitalTile = useCreateInitialTile();

    const addTemplate = () => {
      tags.forEach((tag) =>
        createIniitalTile({
          dimensions: { x: tag.x, y: tag.y },
          tags: [tag.name],
        })
      );
    };

    return (
      <>
        <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
          Template Preview
        </h3>

        {selectedTemplate && (
          <div className="relative w-4/5 bg-white py-4 sm:gap-8 sm:p-8 lg:grid-cols-2">
            <TemplateOption
              icon={<Icon />}
              title={title}
              description={description}
            />
          </div>
        )}

        <div className="relative bg-white px-5">
          {tags?.map(({ name, x, y }) => {
            return (
              <Tag
                name={name}
                className="absolute z-10"
                style={{ top: y, left: x }}
              />
            );
          })}

          {arrows.map(([startId, endId]) => {
            const startTag = tags.find((tag) => tag.id === startId);
            const endTag = tags.find((tag) => tag.id === endId);
            const xStartNudge = 80;
            const yStartNudge = 10;
            const xEndNudge = -5;
            const yEndNudge = 10;
            return (
              <BasicArrowSvg
                start={{
                  x: startTag.x + xStartNudge,
                  y: startTag.y + yStartNudge,
                }}
                end={{ x: endTag.x + xEndNudge, y: endTag.y + yEndNudge }}
                orientation={LineOrientation.HORIZONTAL}
              />
            );
          })}
        </div>

        <div className="p-5 bg-gray-50 sm:p-8 flex absolute items-center bottom-0 left-0 right-0">
          <div onClick={goBack}>
            <span className="-m-3 p-3 flex items-center cursor-pointer rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
              <ArrowLeftOutline />
              <span className="ml-3">Back</span>
            </span>
          </div>

          <div className="flow-root absolute left-1/2 -translate-x-2/4 transform">
            <span
              onClick={addTemplate}
              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-white hover:bg-blue-400 cursor-pointer bg-blue-500 transition ease-in-out duration-150"
            >
              <TemplateOutline />
              <span className="ml-3">Use Template</span>
            </span>
          </div>
          <span />
        </div>
      </>
    );
  }
);