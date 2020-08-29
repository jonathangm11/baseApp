import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import DrawerContent from "./content";
import { makeStyles } from "@material-ui/core/styles";

const LeftDrawer = (props) => {
  const {
    ifDrawerOpened,
    closeDrawer,
    fullOptions,
    setData
  } = props;

  const [leftAnchor, toggleDrawer] = useState(ifDrawerOpened);

  useEffect(() => {
    toggleDrawer(ifDrawerOpened);
  }, [ifDrawerOpened]);

  const toggle = (e) => {
    closeDrawer(e);
  };

  const style = makeStyles((theme) => ({
    drawer: {
      width:"40vw",
      backgroundColor: "rgba(247,247,247,0.9)",
    },
  }));

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            classes={{
              paper: style().drawer,
            }}
            anchor={anchor}
            open={leftAnchor}
            onClose={(e) => toggle(e)}
          >
            <DrawerContent
              setData={setData}
              options={fullOptions}
              closeDrawer = {closeDrawer}
            />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LeftDrawer;
