import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { useAnimation } from "framer-motion";
import {
  ArrowLeftOutline,
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
  TemplateOutline,
  TruckOutline,
} from "heroicons-react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  ArrowAnchorPlacement,
  ArrowBetweenDivs,
  ArrowsBetweenDivsContextProvider,
} from "../../canvas/react-simple-arrows";
import { LineOrientation } from "../react-simple-arrows";

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

export const TemplateOption = ({
  icon,
  title,
  description,
  selectTemplate,
}) => {
  return (
    <span
      onClick={() => selectTemplate(title)}
      className="-m-3 p-3 flex items-start cursor-pointer rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
    >
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </span>
  );
};

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

  const tags = [
    "Context",
    "Decision",
    "Option",
    "Stakeholders",
    "Deadline",

    "Evidence",
    "Pro",
    "Con",
    "Outcome",
    "Add Tag",
  ];
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
          <TemplateOption
            selectTemplate={selectTemplate}
            icon={<FlagOutline />}
            title="Project Scoping"
            description="Get consensus on your project goals, deliverables, tasks, costs and deadlines"
          />
          <TemplateOption
            selectTemplate={selectTemplate}
            icon={<CheckCircleOutline />}
            title="Task Management"
            description="Prioritize, track, and manage each of your project's tasks throught its lifecycle"
          />
          <TemplateOption
            selectTemplate={selectTemplate}
            icon={<ScaleOutline />}
            title="Decision Evaluation"
            description="Make fast, informed and de-risked decisions by examining your choices and alternate resolutions"
          />
          <TemplateOption
            selectTemplate={selectTemplate}
            icon={<LightBulbOutline />}
            title="Idea Validation"
            description="Explore the hidden assumptions and supporting evidence behind your hypotheses"
          />
          <TemplateOption
            selectTemplate={selectTemplate}
            icon={<LightningBoltOutline />}
            title="Brainstorming"
            description="Generate ideas and unlock better answers by amassing potential solutions spontaneously"
          />
          <TemplateOption
            selectTemplate={selectTemplate}
            icon={<EyeOutline />}
            title="Retrospective"
            description="At the end of a project milestone, reflect and review what worked, what didn't, and why"
          />
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
          {template}
        </h3>

        {/* {tags.map((tag) => {
          return (
            <div className="mt-4 ml-8">
              <Tag name={tag} />
            </div>
          );
        })} */}

        <ArrowsBetweenDivsContextProvider debug>
          {({ registerDivToArrowsContext }) => (
            <>
              {/* the arrows can be placed anywhere, as they position themselves absolutely and will wait to display until coordinates are registered */}
              <ArrowBetweenDivs
                from={{ id: "sleep", placement: ArrowAnchorPlacement.TOP }}
                to={{ id: "code", placement: ArrowAnchorPlacement.BOTTOM }}
                orientation={LineOrientation.VERTICAL}
              />
              <ArrowBetweenDivs
                from={{ id: "code", placement: ArrowAnchorPlacement.RIGHT }}
                to={{ id: "shower", placement: ArrowAnchorPlacement.LEFT }}
                orientation={LineOrientation.HORIZONTAL}
              />

              {/* define your content and register each one of the divs by "id" into the context by ref */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 500,
                  height: 300,
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flex: 1,
                  }}
                >
                  <div>
                    <div
                      ref={(div) =>
                        registerDivToArrowsContext({
                          id: "code",
                          div,
                          parent: containerRef.current,
                        })
                      }
                      style={{ padding: 15 }}
                    >
                      <TruckOutline />
                    </div>
                  </div>
                  <div>
                    <div
                      ref={(div) =>
                        registerDivToArrowsContext({
                          id: "shower",
                          div,
                          parent: containerRef.current,
                        })
                      }
                      style={{ padding: 15 }}
                    >
                      <TruckOutline />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flex: 1,
                  }}
                >
                  <div>
                    <div
                      ref={(div) =>
                        registerDivToArrowsContext({
                          id: "sleep",
                          div,
                          parent: containerRef.current,
                        })
                      }
                      style={{ padding: 15 }}
                    >
                      <TruckOutline />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </ArrowsBetweenDivsContextProvider>

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
