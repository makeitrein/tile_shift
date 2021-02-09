import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { useAnimation } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as templateState from "../../state/template";
import { templateOptions } from "../../state/template";
import { TemplateOption } from "./template-option";
import { TemplatePreview } from "./template-preview";

interface Props {
  id: string;
}

export const animateLeft = {
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

export const animateRight = {
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

export const TemplateLibrary = React.memo(({ id }: Props) => {
  const containerRef = useRef();
  const setSelectedTemplateId = useSetRecoilState(
    templateState.selectedTemplateId
  );
  const [preview, setPreview] = useState(false);

  const templateControls = useAnimation();
  const previewControls = useAnimation();

  const goBack = () => setPreview(false);
  const selectTemplate = (templateId: string) => {
    setSelectedTemplateId({ templateId, replaceCursor: false });
    setPreview(true);
    if (preview) {
      templateControls.start("exit");
      previewControls.start("enter");
    } else {
      templateControls.start("enter");
      previewControls.start("exit");
    }
  };

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
        style={!preview ? animateLeft.enter : animateLeft.exit}
      >
        <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
          TileShift Templates
        </h3>

        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
          {Object.entries(templateOptions).map(([templateId, template]) => {
            return (
              <TemplateOption
                key={template().title}
                template={template()}
                selectTemplate={() => selectTemplate(templateId)}
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
        style={preview ? animateRight.enter : animateRight.exit}
        className={`absolute will-transform transition duration-300	 inset-0 ${
          !preview && "pointer-events-none"
        }`}
      >
        <TemplatePreview id={id} goBack={goBack} />
      </div>
    </div>
  );
});
