import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { ArrowLeftOutline, TemplateOutline } from "heroicons-react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as templateState from "../../state/template";
import { TemplateDiagram } from "./template-diagram";
import { TemplateOption } from "./template-option";

interface Props {
  goBack: () => void;
  id: string;
}

export const TemplatePreview = React.memo(({ goBack, id }: Props) => {
  // const tileDimensions = useRecoilValue(tileState.tileDimensions(id));
  const setSelectedTemplateId = useSetRecoilState(
    templateState.selectedTemplateId
  );

  const selectedTemplate = useRecoilValue(templateState.selectedTemplate);

  if (!setSelectedTemplateId) return null;

  return (
    <>
      <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
        Template Preview
      </h3>

      {selectedTemplate && (
        <div className="relative w-4/5 bg-white py-4 sm:gap-8 sm:p-8 lg:grid-cols-2">
          <TemplateOption template={selectedTemplate()} />
        </div>
      )}

      <div className="relative bg-white px-5">
        <TemplateDiagram />
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
            onClick={() =>
              setSelectedTemplateId((template) => ({
                ...template,
                replaceCursor: true,
              }))
            }
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
});
