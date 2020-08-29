import React,{useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const CustomizedTab = (props) => {
  const {tabKey, handleTabChange, tabs} = props;

    const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      borderRadius:'10px',
      height:'4em',
      fontSize:'1.1em',
      font:'#000',
      opacity:1,
      backgroundColor:'#f5f5f5',
      border: '1px white solid',
    },
    selected:{
      backgroundColor:'#D9E1FB',
    },
    wrapper: {
      display: 'inline-block',
      color:'#49166D',
      '&>svg:first-child':{
        marginRight: '5px',
      }
    },
  }))((props) => <Tab disableRipple {...props} />);

  const StyledTabs = withStyles({
    indicator: {
      display: 'none',
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);


  return(
    <StyledTabs  value={tabKey} onChange={handleTabChange} aria-label="styled tabs example">
    {tabs.map(row => {
      return(
        <StyledTab key={row.value} icon={row.icon} label={<React.Fragment>
          {row.label}
          <span style={{ fontSize: "smaller",marginLeft:'0.3em',borderRadius:'5px', padding:'0.3em',backgroundColor: '#6979F8',color:'#fff' }}>{row.rowNum}</span>
        </React.Fragment>} value={row.value} wrapped={row.ifWrapped} />
      )
    })}
    
    </StyledTabs>
  )
}

const TabContainer = (props) => {
    const {tabs} = props;

    const [tabKey, changeTab] = useState(tabs[0].value);

    const handleTabChange = (e, val) => changeTab(val);

      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        tab: {
          backgroundColor: '#',
        },
      }));

      return (
        <div className={useStyles().root}>
          <div className={useStyles().tab}>
              <CustomizedTab  tabKey={tabKey} handleTabChange={handleTabChange} tabs={tabs} />
          </div>
          <Box  style={{width:'100%',height:'100vh',backgroundColor: '#fff'}}>
            {tabs.map(row => {
              return (row.value === tabKey && (row.component || ''))
            })}
          </Box>
        </div>
      );
}

//// Edit here for customized panel component
// function TabPanel(props) {
//   const { children, value, tabValue, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== tabValue}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}
//     >
//       {value === tabValue && (
//         <div>
//           {children}
//           </div>
//       )}
//     </div>
//   );
// }

export default TabContainer;