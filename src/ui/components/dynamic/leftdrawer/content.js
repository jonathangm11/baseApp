import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector } from "react-redux";
import { selectors, actions } from "../../../ducks";
import ExpandableDropdown from "../dropdown";
import {GreenButton} from "../buttons";
import TuneIcon from "@material-ui/icons/Tune";
import { useDispatch } from "react-redux";

const DrawerContent = (props) => {
  const { setData, options, closeDrawer } = props;
  const dispatch = useDispatch();
  
  const [state, setState] = useState({
    ifSaveFilter: false,
    ifClearAll: false,
  });
  const filterBarData = useSelector((state) =>
    selectors.orders.getFilterBarData(state)
  );

  

  useEffect(() => {
    if (state.ifClearAll === true) {
      dispatch(actions.orders.clearAllSearchFilterBarData())
      setState({
        ifClearAll: false,
      });
    }
  }, [state.ifClearAll]);

  const handleSaveButton = (e) => {
    if (!state.ifSaveFilter)
      setState({
        ifSaveFilter: true,
      });
      dispatch(actions.orders.clearAllSearchFilterBarData());
      closeDrawer(e);
  };

  const handleClearButton = () => {
    if (!state.ifClearAll)
      setState({
        ifClearAll: true,
      });
  };
  
  return (
    <div role="presentation">
      <GreenButton
        style={{ float: "right", margin:"0.5em" }}
        variant="contained"
        color="primary"
        onClick={(e) => closeDrawer(e)}
      >
       <TuneIcon style={{ fill: "white" }} /> 
      </GreenButton>
      <List>
        {options.map((row,index) => {
          return (
            <ListItem>
              <ExpandableDropdown
                options={row}
                defaultVal={filterBarData.filter(
                  (option) => option.type === row[0].type
                )}
                key={"fullDropdown"+index}
                ifClear={state.ifClearAll}
                ifSave={state.ifSaveFilter}
                setData={setData}
                type={row[0].type}
              />
            </ListItem>
          );
        })}
        <div style={{ float: "right",margin:"0.5em" }}>
                <GreenButton onClick={(e) => handleSaveButton(e)}>
                  <span style={{ color: "white" }}>Apply</span>
                </GreenButton>
                &nbsp;
                <GreenButton onClick={handleClearButton}>
                  <span style={{ color: "white" }}>Reset</span>
                </GreenButton>
              </div>
      </List>
    </div>
  );
};

export default DrawerContent;
