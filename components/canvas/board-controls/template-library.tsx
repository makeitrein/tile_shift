import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { useAnimation } from "framer-motion";
import React, { useRef, useState } from "react";
import { PanzoomObject } from "../board/panzoom/types";
import { TemplateOption, templateOptions } from "./template-option";
import { TemplatePreview } from "./template-preview";

interface Props {
  panzoom: PanzoomObject;
}
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

export const TemplateLibrary = React.memo(({ panzoom }: Props) => {
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

  const selectedTemplate = templateOptions.find(
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
        <TemplatePreview
          panzoom={panzoom}
          selectedTemplate={selectedTemplate}
          goBack={goBack}
        />
      </div>
    </div>
  );
});
