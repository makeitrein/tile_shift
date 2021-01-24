import { useRecoilValue, useSetRecoilState } from "recoil";
import * as arrowState from "../../state/arrows";

export type ThemeMapOption = {
  color: string;
};

const ArrowRight = () => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="arrow-right"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path>
    </svg>
  );
};

const ArrowLeft = () => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="arrow-left"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
    </svg>
  );
};

const ArrowLeftRight = () => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="arrow-right"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
      <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path>
    </svg>
  );
};

const ArrowNone = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const arrowDirections = {
  right: <ArrowRight />,
  left: <ArrowLeft />,
  leftRight: <ArrowLeftRight />,
  none: <ArrowNone />,
};

export const ArrowHeadPicker = ({ id }) => {
  const setArrow = useSetRecoilState(arrowState.arrow(id));

  return (
    <div
      style={{ width: 230 }}
      className="flex w-full flex-wrap align-middle justify-between"
    >
      {Object.entries(arrowDirections).map(([direction, arrowComponent]) => (
        <>
          <div
            onClick={() => setArrow((arrow) => ({ ...arrow, direction }))}
            className={`p-1 w-12 leading-8 text-xl text-center border cursor-pointer border-solid transform transition-transform hover:scale-110`}
          >
            {arrowComponent}
          </div>
        </>
      ))}
    </div>
  );
};

export const CurrentArrowHeadPicker = ({ id }) => {
  const arrow = useRecoilValue(arrowState.arrow(id));

  return <div className="text-xl">{arrowDirections[arrow.direction]}</div>;
};
