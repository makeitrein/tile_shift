import { Drawer } from "antd";
import React, { useState } from "react";
import { Discussion } from "./discussion";

export const DiscussionDrawer: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <span className="cursor-pointer" onClick={showDrawer}>
        {children}
      </span>
      <Drawer
        width={500}
        title="Discussion"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Discussion />
      </Drawer>
    </>
  );
};
