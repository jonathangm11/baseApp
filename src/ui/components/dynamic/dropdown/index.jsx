import React, { Component } from 'react';

import Select from 'react-select';
import {components} from 'react-select';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'


export default class ExpandableDropdown extends Component<*, State> {
  constructor(props){
    super(props);
    this.state = {
      value: [],
      ifExpanded:false,
      ifMultiValue:false,
      searchType: {label:'Contains',value:'contains'},
    }
  }

  componentDidUpdate(prevProps, prevState){
    let {ifSave, ifClear, parentOptions,getData} = this.props;

    if(!prevProps.ifSave && ifSave) getData(this.state.value);
    if(!prevProps.ifClear && ifClear) this.setState({value:[]});
    if(prevProps.parentOptions && parentOptions && (prevProps.parentOptions.length > parentOptions.length)){
      if(!ifSave && parentOptions.length>=0){
        if(this.state.value.length>0){
          let type = this.state.value[0]["type"];
          if(parentOptions.filter(option => option.type==type).length == 0) this.setState({value:[], ifMultiValue:false});
        }
      }
    }
  }

  handleChange = (newValue, actionMeta) => {
    if(actionMeta.action === "select-option"){
      if(newValue.length >= 2){
        this.setState({
          ifMultiValue:true,
          ifExpanded: (this.state.ifExpanded)?(!this.state.ifExpanded):this.state.ifExpanded,
        })
      }
    }else if(actionMeta.action === 'clear' || actionMeta.action === 'remove-value'){
      if(newValue === null || newValue.length < 2){
        this.setState({
          ifMultiValue:false,
        })
      }
    }
    this.setState({
      value: newValue,
    })
  };

  handleChangeSearchType = (newValue) => {
    this.setState({
      searchType: newValue,
    })
  }

  handleExpansion = () => {
    this.setState({
      ifExpanded: true,
    })
  }

  handleMultiValueClear = () => {
    this.setState({
      value: [],
    })
  }

  MultiValueLabel = ({children, ...innerProps}) => {
    if(this.state.ifMultiValue && !this.state.ifExpanded){
      return (innerProps.data == this.state.value[0])?
        (
          <components.MultiValueLabel {...innerProps} >
            <button type="button" className="btn" onClick={this.handleExpansion}>+</button>
            <span style={{color:"black"}}>({this.state.value.length})&nbsp;  </span>
            { 
              this.state.value.map((e,index) =>{
                return (index==0?(e.label):" ,"+e.label);
              })
            } 
            </components.MultiValueLabel>
        )
      :'';
    }else if(this.state.ifExpanded || !this.state.ifMultiValue){
      return (<components.MultiValueLabel {...innerProps} >
        {children}
        </components.MultiValueLabel>)
    }
  };

  MultiValueRemove = ({children, ...innerProps}) => {
    if(this.state.ifMultiValue && !this.state.ifExpanded){
      return  (innerProps.data == this.state.value[0])?(
          <components.MultiValueRemove>
            <div>
            <span type="button" style={{position: "relative", top:"0.7em"}} onClick={this.handleMultiValueClear}>
              <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-6q0nyr-Svg">
                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z">
                  </path>
                  </svg>
                  </span>
                  </div>
          </components.MultiValueRemove>
      ):'';
    }else if(this.state.ifExpanded || !this.state.ifMultiValue){
      return ( <components.MultiValueRemove {...innerProps}>
        </components.MultiValueRemove>);
    }
  };
  
  
  render() {
    const groupedStyle = {
      control: styles => ({
        ...styles, backgroundColor: 'white' 
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return{
          ...styles,
         }

        },
        multiValue: (styles, { data }) => {
          return {
            ...styles,
            backgroundColor: '#E5E7FA',
            color: '#6979F8'
          };
        },
        multiValueLabel: (styles, { data }) => {
          return {
            ...styles,
            color: '#6979F8'
          };
        },
    };

    const searchTypeOptions = 
    [{"label":"Contains",value:"contains",typeNum:"1"},
    {"label":"Starts with",value:"starts_with",typeNum:"2"},
    {"label":"Equals",value:"equals",typeNum:"3"},
    {"label":"Ends with",value:"ends_with",typeNum:"4"}
  ];

    return (
      <span style={{display:'flex'}}>
      <div style={{width:'10%'}}>
      <Select
          options={searchTypeOptions}
          styles={groupedStyle}
          value={this.state.searchType}
          onChange={this.handleChangeSearchType}
          components = {{IndicatorSeparator: () => null}}

      />
      </div>
      <div style={{width:'90%'}}>
      <Select
        isMulti
        onChange={this.handleChange}
        value={this.state.value}
        styles={groupedStyle}
        options={this.props.options}
        components={{MultiValueLabel: this.MultiValueLabel,
                     MultiValueRemove: this.MultiValueRemove}}
      />
      </div>
      </span>
    );
  }
}