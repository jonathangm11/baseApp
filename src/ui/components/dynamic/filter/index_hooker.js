import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { components } from "react-select";
import ExpandableDropdown from "../dropdown/index";
import FilterListIcon from "@material-ui/icons/FilterList";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TuneIcon from "@material-ui/icons/Tune";
import { GreenButton, PurpleButton } from "../buttons";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import LeftDrawer from "../leftdrawer";
import "./index.css";

const Filter = (props) => {
  const { options } = props;

  const [state, setState] = useState({
    selectedOptions: [],
    ifSaveFilter: false,
    ifClearAll: false,
    indexArr: [],
    ifOpenDropdown: false,
    ifOpenDrawer: false,
  });

  const calculateTypeIndex = () => {
    setState({
      ...state,
      ifSaveFilter: false,
    });

    let filterTypesArr = [];
    options.forEach((row) => {
      filterTypesArr.push(row[0].type);
    });

    let indexArr = [];
    filterTypesArr.forEach((ele) => {
      for (let i = 0; i < state.selectedOptions.length; i++) {
        if (state.selectedOptions[i].type === ele) {
          indexArr.push(state.selectedOptions[i]);
          break;
        }
      }
    });
    setState({
      ...state,
      indexArr: indexArr,
    });
  };

  // useEffect(()=>{
  //   calculateTypeIndex();
  // },[ state.selectedOptions]);


  const getSelectedOptions = (data) => {
    if (Array.isArray(data)) {
      setState(
        (prevState) => ({
          selectedOptions: prevState.selectedOptions.concat(data),
        }),
        () => {
          
        }
      );
    }
  };




  const handleGroupValueClear = (type, event) => {
    event.stopPropagation();
    const items = state.selectedOptions.filter(
      (option) => option.type === type
    );
    const temp = state.selectedOptions.filter(
      (option) => !items.find((data) => option.value === data.value)
    );
    setState({
      ...state,
      selectedOptions: temp,
    });
  };

  const handleSaveButton = () => {
    if (!state.ifSaveFilter)
      setState({
        ...state,
        ifSaveFilter: true,
        selectedOptions: [],
      });
  };

  const handleClearButton = () => {
    if (!state.ifClearAll)
      setState(
        {
          ...state,
          ifClearAll: true,
          selectedOptions: [],
        },
        () => {
          setState({
            ...state,
            ifClearAll: false,
          });
        }
      );
  };

  const handleLeftDrawer = (e) => {
    e.stopPropagation();
    //toDo: add desired behaviours
    setState({
      ...state,
      ifOpenDrawer: !state.ifOpenDrawer,
    });
  };

  const handleSaveFilter = (e) => {
    e.stopPropagation();
    //toDo: add desired behaviours
  };

  const handleDropdownExpand = (e) => {
    e.stopPropagation();

    setState({
      ...state,
      ifOpenDropdown: !state.ifOpenDropdown,
    });
  };

  const MultiValueLabelComponent = ({ children, ...innerProps }) => {
    if (
      state.indexArr.find(
        (data) =>
          data.value === innerProps.data.value &&
          data.label === innerProps.data.label
      )
    ) {
      let type = innerProps.data.type;
      let items = state.selectedOptions.filter(
        (option) => option.type === type
      );
      return (
        <components.MultiValueLabel {...innerProps}>
          <span>{type}:</span>
          <span style={{ color: "black" }}>({items.length})&nbsp; </span>
          {items.map((e, index) => {
            return index === 0 ? e.label : " ," + e.label;
          })}
        </components.MultiValueLabel>
      );
    } else {
      return "";
    }
  };

  const MultiValueRemoveComponent = ({ children, ...innerProps }) => {
    return state.indexArr.find(
      (data) =>
        data.value === innerProps.data.value &&
        data.label === innerProps.data.label
    ) ? (
      <components.MultiValueRemove>
        <span
          type="button"
          onClick={(e) => handleGroupValueClear(innerProps.data.type, e)}
        >
          <svg
            height="14"
            width="14"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-6q0nyr-Svg"
          >
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
        </span>
      </components.MultiValueRemove>
    ) : (
      ""
    );
  };

  const DropdownIndicatorComponent = (
    props: ElementConfig<typeof components.DropdownIndicator>
  ) => {
    return (
      <div style={{ backgroundColor: "white" }}>
        <components.DropdownIndicator {...props}>
          <span
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FilterListIcon style={{ fill: "green" }} />
          </span>
        </components.DropdownIndicator>
      </div>
    );
  };

  const SelectContainerComponent = (props) => {
    return (
      <div style={{ width: "100%" }}>
        <components.Control {...props} />
      </div>
    );
  };

  const filterStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "1px solid #49166D",
      width: "100%",
    }),

    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#E5E7FA",
        color: "#6979F8",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#6979F8",
      };
    },
  };

  return (
    <Box>
      <LeftDrawer
        ifDrawerOpened={state.ifOpenDrawer}
        closeDrawer={(e) => handleLeftDrawer(e)}
      />
      <ExpansionPanel expanded={state.ifOpenDropdown}>
        <ExpansionPanelSummary aria-controls="filter" id="filter">
          <GreenButton
            variant="contained"
            color="primary"
            onClick={(e) => handleLeftDrawer(e)}
          >
            <TuneIcon style={{ fill: "white" }} />
          </GreenButton>
          <span
            role="button"
            onClick={(e) => handleDropdownExpand(e)}
            style={{ width: "100%" }}
          >
            <Select
              isMulti
              openMenuOnClick={false}
              value={state.selectedOptions}
              closeMenuOnSelect={false}
              styles={filterStyle}
              isClearable={false}
              isDisabled
              placeholder=""
              components={{
                MultiValueLabel: MultiValueLabelComponent,
                MultiValueRemove: MultiValueRemoveComponent,
                DropdownIndicator: DropdownIndicatorComponent,
                IndicatorSeparator: () => null,
                Menu: () => null,
                input: () => null,
                SelectContainer: SelectContainerComponent,
              }}
            />
          </span>
          <PurpleButton
            variant="contained"
            color="primary"
            onClick={(e) => handleSaveFilter(e)}
          >
            <StarBorderIcon style={{ fill: "white" }} />
          </PurpleButton>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <div style={{ width: "100%" }}>
            <PurpleButton style={{ float: "right" }}>
              <span style={{ color: "white" }}>
                <MenuIcon />
                &nbsp;Show More
              </span>
            </PurpleButton>
            <div style={{ clear: "right", width: "100%" }}>
              <br />
              {options.map((row) => {
                return (
                  <ExpandableDropdown
                    options={row}
                    parentOptions={state.selectedOptions}
                    ifClear={state.ifClearAll}
                    ifSave={state.ifSaveFilter}
                    setData={getSelectedOptions}
                  />
                );
              })}
            </div>
            <br />
            <div style={{ float: "right" }}>
              <GreenButton onClick={handleSaveButton}>
                <span style={{ color: "white" }}>Save</span>
              </GreenButton>{" "}
              &nbsp;
              <GreenButton onClick={handleClearButton}>
                <span style={{ color: "white" }}>Clear</span>
              </GreenButton>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

export default Filter;
