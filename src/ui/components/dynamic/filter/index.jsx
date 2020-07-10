import React, { Fragment, Component } from 'react';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { components } from 'react-select';
import ExpandableDropdown from '../dropdown/index';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TuneIcon from '@material-ui/icons/Tune';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';


export default class Filter extends Component<*, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      ifSaveFilter: false,
      ifClearAll: false,
      indexArr: [],
      ifOpenDropdown: false,
    }
    this.selectRef = React.createRef();
  }

  getSelectedOptions = (data) => {
    if (Array.isArray(data)) {
      this.setState((prevState) => ({
        selectedOptions: prevState.selectedOptions.concat(data)
      }), () => {
        this.setState({
          ifSaveFilter: false,
        });
        this.calculateTypeIndex();
      });
    }
  };

  calculateTypeIndex = () => {
    const { filterTypesArr } = this.props;

    let indexArr = [];
    filterTypesArr.forEach((ele) => {
      for (let i = 0; i < this.state.selectedOptions.length; i++) {
        if (this.state.selectedOptions[i].type == ele) {
          indexArr.push(this.state.selectedOptions[i]);
          break;
        }
      }
    })
    this.setState({
      indexArr: indexArr
    })
  }


  handleGroupValueClear = (type,event) => {
    event.stopPropagation();
    const items = this.state.selectedOptions.filter(option => option.type == type);
    const temp = this.state.selectedOptions.filter(option => !items.find(data => option.value == data.value));
    this.setState({
      selectedOptions: temp,
    })
  }

  handleSaveButton = () => {
    if (!this.state.ifSaveFilter)
      this.setState({
        ifSaveFilter: true,
        selectedOptions: [],
      });
  }

  handleClearButton = () => {
    if (!this.state.ifClearAll)
      this.setState({
        ifClearAll: true,
        selectedOptions: [],
      }, () => {
        this.setState({
          ifClearAll: false,
        })
      });
  }

  handleLeftDrawer = (e) => {
    e.stopPropagation();
    //toDo: add desired behaviours 
  }

  handleSaveFilter = (e) => {
    e.stopPropagation();
    //toDo: add desired behaviours 
  }
  
  handleDropdownExpand = (e) => {
    e.stopPropagation();
    
    this.setState({
      ifOpenDropdown:!this.state.ifOpenDropdown
    });
  }

  MultiValueLabelComponent = ({ children, ...innerProps }) => {
    if (this.state.indexArr.find(data => ((data.value === innerProps.data.value) && (data.label === innerProps.data.label)))) {
      let type = innerProps.data.type;
      let items = this.state.selectedOptions.filter(option => option.type == type);
      return (
        <components.MultiValueLabel {...innerProps} >
          <span>{type}:</span>
          <span style={{ color: "black" }}>({items.length})&nbsp;  </span>
          {
            items.map((e, index) => {
              return (index == 0 ? (e.label) : " ," + e.label);
            })
          }
        </components.MultiValueLabel>)
    } else {
      return '';
    }

  };

  MultiValueRemoveComponent = ({ children, ...innerProps }) => {
    return (this.state.indexArr.find(data => ((data.value === innerProps.data.value) && (data.label === innerProps.data.label)))) ? (
      <components.MultiValueRemove>
        <span type="button" onClick={(e) => this.handleGroupValueClear(innerProps.data.type,e)}>
          <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z">
            </path>
          </svg>
        </span>
      </components.MultiValueRemove>
    ) : '';
  };

  DropdownIndicatorComponent = (
    props: ElementConfig<typeof components.DropdownIndicator>
  ) => {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <components.DropdownIndicator {...props}>

          <span type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FilterListIcon style={{ fill: "green" }} /></span>
        </components.DropdownIndicator>
      </div>
    );
  };

  SelectContainerComponent = props => {
    return(
      <div style={{width:'100%'}}>
        <components.Control {...props} />
      </div>
    );
    };

  render() {
    const groupedStyle = {
      control: styles => ({
        ...styles, backgroundColor: 'white',
        border: '1px solid #49166D',
        width: '100%'
      }),

      container: (provided) => ({
        ...provided,
        width: '100%'
      }),
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

    const GreenButton = withStyles({
      root: {
        backgroundColor: '#2B8000',
        textTransform: 'none',
      },
    })(Button);

    const PurpleButton = withStyles({
      root: {
        backgroundColor: '#49166D',
        textTransform: 'none',
      },
    })(Button);

    const options1 = [{ "label": "test1", "value": "test1", "type": "Product" },
    { "label": "test2", "value": "test2", "type": "Product" },
    { "label": "test3", "value": "test3", "type": "Product" }];

    const options2 = [{ "label": "test4", "value": "test4", "type": "Customer" },
    { "label": "test5", "value": "test5", "type": "Customer" },
    { "label": "test6", "value": "test6", "type": "Customer" }];

    const options3 = [{ "label": "test7", "value": "test7", "type": "Type" },
    { "label": "test8", "value": "test8", "type": "Type" },
    { "label": "test9", "value": "test9", "type": "Type" }];

    return (
      <span>
        <div style={{width:'100%'}}>
        <ExpansionPanel expanded={this.state.ifOpenDropdown}>
          <ExpansionPanelSummary
            aria-controls="filter"
            id="filter"
          >
              <GreenButton variant="contained" color="primary" onClick={(e) => this.handleLeftDrawer(e)}>
                <TuneIcon style={{ fill: 'white' }} />
              </GreenButton>
            <span role="button" onClick={(e) => this.handleDropdownExpand(e)} style={{width:'100%'}}>
              <Select
              isMulti
              openMenuOnClick={false}
              value={this.state.selectedOptions}
              closeMenuOnSelect={false}
              styles={groupedStyle}
              isClearable={false}
              isDisabled
              placeholder=""
              components={{
                MultiValueLabel: this.MultiValueLabelComponent,
                MultiValueRemove: this.MultiValueRemoveComponent,
                DropdownIndicator: this.DropdownIndicatorComponent,
                IndicatorSeparator: () => null,
                Menu: () => null,
                input: () => null,
                SelectContainer: this.SelectContainerComponent
              }} />
              </span>
               <GreenButton variant="contained" color="primary" onClick={(e)=>this.handleSaveFilter(e)}>
                <StarBorderIcon style={{ fill: 'white' }} />
              </GreenButton>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <div style={{ width: '100%' }}>
              <PurpleButton style={{ float:'right'}}><span style={{color:'white'}}><MenuIcon/>&nbsp;Show More</span></PurpleButton>
              
              <div style={{clear: 'right', width: '100%'}}>
                <br/>
                <div style={{display:'inline-flex',width:'100%'}}><Typography style={{margin:'auto', minWidth:'5em'}}>{options1[0].type}:</Typography><div style={{width:"100%"}}><ExpandableDropdown options={options1} parentOptions={this.state.selectedOptions} ifClear={this.state.ifClearAll} ifSave={this.state.ifSaveFilter} getData={this.getSelectedOptions}/></div></div>
                <div style={{display:'inline-flex',width:'100%'}}><Typography style={{margin:'auto', minWidth:'5em'}}>{options2[0].type}:</Typography><div style={{width:"100%"}}><ExpandableDropdown options={options2} parentOptions={this.state.selectedOptions} ifClear={this.state.ifClearAll} ifSave={this.state.ifSaveFilter} getData={this.getSelectedOptions}/></div></div>
                <div style={{display:'inline-flex',width:'100%'}}><Typography style={{margin:'auto', minWidth:'5em'}}>{options3[0].type}:</Typography><div style={{width:"100%"}}><ExpandableDropdown options={options3} parentOptions={this.state.selectedOptions} ifClear={this.state.ifClearAll} ifSave={this.state.ifSaveFilter} getData={this.getSelectedOptions}/></div></div>
              </div>
              <br/>
              <div style={{float:'right'}}>
                <GreenButton onClick={this.handleSaveButton}><span style={{color:'white'}}>Save</span></GreenButton> &nbsp;
                <GreenButton onClick={this.handleClearButton}><span style={{color:'white'}}>Clear</span></GreenButton>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
       
      </span>
    );
  }
}