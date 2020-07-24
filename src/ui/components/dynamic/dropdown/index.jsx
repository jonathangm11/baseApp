import React, { useState, useEffect, useRef } from "react";
import { actions } from '../../../ducks';
import Select from "react-select";
import { useSelector } from "react-redux";
import { selectors } from "../../../ducks";
import { components } from "react-select";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";

const ExpandableDropdown = (props) => {
  const { ifSave, ifClear, setData, options, defaultVal, type,key } = props;

  const filterBarData = useSelector((state) =>
    selectors.orders.getFilterBarData(state)
  );

  const prevProps = useRef({ ifSave, ifClear, setData, filterBarData }).current;

  const dispatch = useDispatch();

  const [state, setState] = useState({
    value: defaultVal,
    ifExpanded: false,
    ifMultiValue: false,
    searchType: { label: "Contains", value: "contains" },
  });


  useEffect(() => {

    if (
      prevProps.filterBarData &&
      filterBarData &&
      prevProps.filterBarData.length > filterBarData.length
    ) {
      if (!ifSave && filterBarData.length >= 0) {
        if (state.value.length > 0) {
          let type = state.value[0]["type"];
          if (
            filterBarData.filter((option) => option.type === type).length === 0
          )
            setState({ ...state, value: [], ifMultiValue: false });
        }
      }
    }
    return () => {
      prevProps.filterBarData = filterBarData;
      prevProps.setData = setData;
    };
  }, [filterBarData, setData]);

  useEffect( () => {
      if (!prevProps.ifSave && ifSave ){
        setData(state.value);
        console.log("testfilterbardata",filterBarData);
        let temp = state.value.filter(option1 => !filterBarData.find((option2)=>option1.value === option2.value) )
        dispatch(actions.orders.setSearchDropdownData(temp));
      }
      return () => {
        prevProps.ifSave = ifSave;
      };
    },[ifSave]);
  
  useEffect(() => {
    function emptyValue() {
      setState({
        ...state,
        value: [],
      });
      dispatch(actions.orders.clearSearchDropdownData(type));
    }
    if (!prevProps.ifClear && ifClear) emptyValue();
    return () => {
      prevProps.ifClear = ifClear;
    };
  },[ifClear]);

  useEffect(() =>{
    if(state.value.length >= 2 ){
      setState({
        ...state,
        ifMultiValue:true
      })
    }else{
      setState({
        ...state,
        ifMultiValue:false,
      })
    }
  },[state.value])




  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option" && newValue.length >= 2) {
        setState({
          ...state,
          ifMultiValue: true,
          value: newValue,
          ifExpanded: state.ifExpanded ? !state.ifExpanded : state.ifExpanded,
        });
    } else if (
      (actionMeta.action === "clear" ||
      actionMeta.action === "remove-value") && (newValue === null || newValue.length < 2)
    ) {
        setState({
          ...state,
          ifMultiValue: false,
          value: newValue,
        });
    }else{ 
      setState({
        ...state,
        value: newValue,
      });
    }
  };

  const handleChangeSearchType = (newValue) => {
    setState({
      ...state,
      searchType: newValue,
    });
  };

  const handleExpansion = () => {
    setState({
      ...state,
      ifExpanded: true,
    });
  };

  const handleMultiValueClear = () => {
    setState({
      ...state,
      value: [],
    });
  };

  const MultiValueLabel = ({ children, ...innerProps }) => {
    if (state.ifMultiValue && !state.ifExpanded) {
      return innerProps.data === state.value[0] ? (
        <components.MultiValueLabel {...innerProps}>
          <span>
            <button
              type="button"
              style={{ padding: "0" }}
              className="btn"
              onClick={handleExpansion}
            >
              +
            </button>
            &nbsp;
            <span style={{ color: "black" }}>({state.value.length})&nbsp;</span>
            {state.value.map((e, index) => {
              return index === 0 ? e.label : " ," + e.label;
            })}
          </span>
        </components.MultiValueLabel>
      ) : (
        ""
      );
    } else if (state.ifExpanded || !state.ifMultiValue) {
      return (
        <components.MultiValueLabel {...innerProps}>
          {children}
        </components.MultiValueLabel>
      );
    }
  };

  const MultiValueRemove = ({ children, ...innerProps }) => {
    if (state.ifMultiValue && !state.ifExpanded) {
      return innerProps.data === state.value[0] ? (
        <components.MultiValueRemove>
          <div>
            <span
              type="button"
              style={{ position: "relative", top: "0.2em" }}
              onClick={handleMultiValueClear}
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
          </div>
        </components.MultiValueRemove>
      ) : (
        ""
      );
    } else if (state.ifExpanded || !state.ifMultiValue) {
      return (
        <components.MultiValueRemove
          {...innerProps}
        ></components.MultiValueRemove>
      );
    }
  };

  const groupedStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
    }),
    option: (styles) => {
      return {
        ...styles,
      };
    },
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
        padding: "0.1em",
        color: "#6979F8",
      };
    },
  };

  const searchTypeOptions = [
    { label: "Contains", value: "contains", typeNum: "1" },
    { label: "Starts with", value: "starts_with", typeNum: "2" },
    { label: "Equals", value: "equals", typeNum: "3" },
    { label: "Ends with", value: "ends_with", typeNum: "4" },
  ];

  return (
    <div style={{ display: "inline-flex", width: "100%" }}>
      <Typography style={{ margin: "auto", minWidth: "5em" }}>
        {type}:
      </Typography>
      <div style={{ width: "100%" }}>
        <span style={{ display: "flex" }}>
          <div style={{ width: "10vw" }}>
            <Select
              key={"searchType_" + key}
              options={searchTypeOptions}
              styles={groupedStyle}
              value={state.searchType}
              onChange={handleChangeSearchType}
              components={{ IndicatorSeparator: () => null }}
            />
          </div>
          <div style={{ width: "90%" }}>
            <Select
              key={key}
              isMulti
              onChange={handleChange}
              value={state.value}
              styles={groupedStyle}
              options={options}
              components={{
                MultiValueLabel: MultiValueLabel,
                MultiValueRemove: MultiValueRemove,
              }}
            />
          </div>
        </span>
      </div>
    </div>
  );
};

export default ExpandableDropdown;
