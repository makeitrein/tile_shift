import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { useAnimation } from "framer-motion";
import { ArrowLeftOutline, TemplateOutline } from "heroicons-react";
import React, { useRef, useState } from "react";
import { LineOrientation } from "react-simple-arrows";
import styled from "styled-components";
import { BasicArrowSvg } from "../react-simple-arrows/ArrowSvg/BasicArrowSvg";
import { Tag } from "../tile-menu/tag-picker";
import { TemplateOption, templateOptions } from "./template-option";

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

interface Props {}

const variantsTemplateLibrary = {
  enter: {
    zIndex: 1,
    transform: "translateX(0px)",
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    transform: "translateX(-100px)",
    opacity: 0,
  },
};

const variantsTemplatePreview = {
  enter: {
    zIndex: 1,
    transform: "translateX(0px)",
    opacity: 1,
  },
  exit: {
    transform: "translateX(100px)",
    opacity: 0,
  },
};

export const TemplateLibrary = React.memo(({}: Props) => {
  const containerRef = useRef();
  const [template, setTemplate] = useState(null);
  const [preview, setPreview] = useState(false);

  const templateControls = useAnimation();
  const previewControls = useAnimation();

  const goBack = () => setPreview(false);
  const selectTemplate = (template: string) => {
    setTemplate(template);
    setPreview(true);
    if (preview) {
      templateControls.start("exit");
      previewControls.start("enter");
    } else {
      templateControls.start("enter");
      previewControls.start("exit");
    }
  };

  const SelectedTemplate = templateOptions.find(
    (option) => option.title === template
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden "
      style={{ width: "44rem", height: 596 }}
    >
      <div
        key={"toolbar"}
        className={`absolute will-transform z-1 transition duration-300	 ${
          preview && "pointer-events-none"
        }`}
        style={
          !preview
            ? variantsTemplateLibrary.enter
            : variantsTemplateLibrary.exit
        }
      >
        <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
          TileShift Templates
        </h3>

        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
          {templateOptions.map(({ icon: Icon, title, description }) => {
            return (
              <TemplateOption
                key={title}
                selectTemplate={selectTemplate}
                icon={<Icon />}
                title={title}
                description={description}
              />
            );
          })}
        </div>
        <div className="p-5 bg-gray-50 sm:p-8">
          <span className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100 transition ease-in-out duration-150">
            <span className="flex items-center">
              <span className="text-base font-medium text-gray-900">
                Custom Templates
              </span>
              <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-blue-100 text-blue-800">
                Coming May 2021
              </span>
            </span>
            <span className="mt-1 block text-sm text-gray-500">
              Don't see the template you want? Create your own!
            </span>
          </span>
        </div>
      </div>

      <div
        key="toolbar2"
        style={
          preview ? variantsTemplatePreview.enter : variantsTemplatePreview.exit
        }
        className={`absolute will-transform transition duration-300	 inset-0 ${
          !preview && "pointer-events-none"
        }`}
      >
        <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
          Template Preview
        </h3>

        {SelectedTemplate && (
          <div className="relative w-4/5 bg-white py-4 sm:gap-8 sm:p-8 lg:grid-cols-2">
            <TemplateOption
              icon={<SelectedTemplate.icon />}
              title={SelectedTemplate.title}
              description={SelectedTemplate.description}
            />
          </div>
        )}

        <div className="relative bg-white px-5 -mt-5">
          {SelectedTemplate?.tags?.map(({ name, x, y }) => {
            return (
              <Tag
                name={name}
                className="absolute z-10"
                style={{ top: y, left: x }}
              />
            );
          })}

          {SelectedTemplate?.arrows.map(([startId, endId]) => {
            const startTag = SelectedTemplate.tags.find(
              (tag) => tag.id === startId
            );
            const endTag = SelectedTemplate.tags.find(
              (tag) => tag.id === endId
            );
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
          <div onClick={() => goBack()}>
            <span className="-m-3 p-3 flex items-center cursor-pointer rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
              <ArrowLeftOutline />
              <span className="ml-3">Back</span>
            </span>
          </div>

          <div className="flow-root absolute left-1/2 -translate-x-2/4 transform">
            <span className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-white hover:bg-blue-400 cursor-pointer bg-blue-500 transition ease-in-out duration-150">
              <TemplateOutline />
              <span className="ml-3">Use Template</span>
            </span>
          </div>
          <span />
        </div>
      </div>
    </div>
  );
});
