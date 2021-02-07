import {
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
} from "heroicons-react";
import React from "react";

interface Props {}

export const TemplateOption = ({ icon, title, description }) => {
  return (
    <span className="-m-3 p-3 flex items-start cursor-pointer rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
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

export const TemplateLibrary = React.memo(({}: Props) => {
  return (
    <div style={{ width: "44rem" }}>
      <h3 className="text-sm px-5 pt-6 font-medium tracking-wide text-gray-500 uppercase">
        TileShift Templates
      </h3>
      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
        <TemplateOption
          icon={<FlagOutline />}
          title="Project Scoping"
          description="Get consensus on your project goals, deliverables, tasks, costs and deadlines"
        />
        <TemplateOption
          icon={<CheckCircleOutline />}
          title="Task Management"
          description="Prioritize, track, and manage each of your project's tasks throught its lifecycle"
        />
        <TemplateOption
          icon={<ScaleOutline />}
          title="Decision Evaluation"
          description="Make fast, informed and de-risked decisions by examining choices and alternate resolutions."
        />
        <TemplateOption
          icon={<LightBulbOutline />}
          title="Idea Validation"
          description="Explore your idea's hidden assumptions, evidence, and counterpoints"
        />
        <TemplateOption
          icon={<LightningBoltOutline />}
          title="Brainstorming"
          description="Generate ideas and unlock better answers by amassing potential solutions spontaneously"
        />
        <TemplateOption
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
  );
});
