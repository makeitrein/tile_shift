import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftOutline,
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
  TemplateOutline,
} from "heroicons-react";
import React, { useState } from "react";
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

const variants = {
  enter: {
    x: 100,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -100,
    opacity: 0,
  },
};

export const TemplateLibrary = React.memo(({}: Props) => {
  const [template, setTemplate] = useState(null);

  const [initialAnimation, setInitialAnimation] = useState(false);

  const selectTemplate = (template: string | null) => {
    setInitialAnimation(true);
    setTemplate(template);
  };
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "44rem", height: 596 }}
    >
      <AnimatePresence>
        {!template ? (
          <motion.div
            key={"toolbar"}
            variants={variants}
            initial={initialAnimation ? "exit" : false}
            animate="center"
            exit="enter"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="relative z-1"
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
                description="Explore the hidden assumptions and supporting evidence behind your ideas"
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
          </motion.div>
        ) : (
          <motion.div
            key="toolbar2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
              {template}
            </h3>

            <div className="p-5 bg-gray-50 sm:p-8 flex absolute items-center bottom-0 left-0 right-0">
              <div onClick={() => selectTemplate(null)}>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
