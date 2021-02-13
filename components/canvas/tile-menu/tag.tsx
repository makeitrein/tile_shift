import { BookOpenOutline } from "heroicons-react";
import React, { CSSProperties } from "react";
import { noSelectoClass } from "../board/board";
import { allTags } from "./tag-data";

export const Tag = React.memo(
  ({
    name,
    onClick,
    style,
    className,
    children,
    active,
  }: {
    name: string;
    children?: React.ReactNode;
    onClick?: () => void;
    style?: CSSProperties;
    className?: string;
    active?: boolean;
  }) => {
    const tag = [...allTags].find((tag) => tag.name === name) || {
      icon: BookOpenOutline,
      color: "blue",
    };

    const { icon: Icon, color } = tag;

    /*
    purge css colors
    hover:bg-light-blue-200 hover:text-light-blue-900 bg-light-blue-100 text-light-blue-800
    hover:bg-indigo-200 hover:text-indigo-900 bg-indigo-100 text-indigo-800
    hover:bg-amber-200 hover:text-amber-900 bg-amber-100 text-amber-800
    hover:bg-orange-200 hover:text-orange-900 bg-orange-100 text-orange-800
    hover:bg-green-200 hover:text-green-900 bg-green-100 text-green-800
    hover:bg-red-200 hover:text-red-900 bg-red-100 text-red-800
    hover:bg-gray-200 hover:text-gray-900 bg-gray-100 text-gray-800

  */

    const tagColors = !active
      ? `bg-white text-gray-800 hover:bg-${color}-100 hover:text-${color}-800`
      : `bg-${color}-100 text-${color}-800`;

    return (
      <span
        style={style}
        onClick={onClick}
        className={`${noSelectoClass} ${className} ${tagColors}  inline-flex cursor-pointer items-center py-1 px-2 rounded-md text-sm font-medium`}
      >
        {/* <Icon className="no-selecto" width={16} /> */}

        <span className={noSelectoClass}>{name}</span>
      </span>
    );
  }
);
