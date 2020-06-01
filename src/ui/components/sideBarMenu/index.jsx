import React from "react";
import { List, ListItem, Divider, Collapse} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Link } from 'react-router-dom';
import Label from '../dynamic/label';

const SideMenuItem=({ depthStep = 10, depth = 0, expanded, item })=> {
  const [collapsed, setCollapsed] = React.useState(true);
  const { label, items, Icon, path } = item;
  let expandIcon;

  const toggleCollapse = () => {
    setCollapsed(prevValue => !prevValue);
  } 

  const onClick = (e) => {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
  }  

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className="sidebar-item-expand-arrow-expanded"
      />
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow" />
    );
  }

  return (
    <React.Fragment>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className="sidebar-item-content"
        >
          {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          <div className="sidebar-item-text">
             {path ? <Link to={path} className="" style={{ textDecoration: 'none' }}><Label labelId={label}/></Link> : <Label labelId={label}/>}         
          </div>
        </div>
        {expandIcon}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <SideMenuItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </React.Fragment>
  );
}

const itemsTmp = [
    { name: "home", label: "homelb", path:"/" },
    {
      name: "customer",
      label: "customersOptlb",
      items: [
        { name: "customers", label: "customersOptlb", path:"/customers" },
        { name: "customersDashboard", label: "customersDashboardlb", path:"/customers/dashboard" }
      ]
    },
     "divider",
    {
        name: "order",
        label: "ordersOptlb",
        items: [
          { name: "orders", label: "ordersOptlb", path:"/orders" },
          { name: "ordersDashboard", label: "ordersDashboardlb", path:"/orders/dashboard" }
        ]
      },      
    "divider",
    {
      name: "tasks",
      label: "tasksOptlb",
      items: [
        { name: "tasks", label: "tasksOptlb", path:"/tasks" },
        { name: "tasksDashboard", label: "tasksDashboardlb",  path:"/tasks/dashboard" },
        "divider",
        {
          name: "jeops",
          label: "jeopsOptlb",
          items: [
            { name: "jeops", label: "jeopsOptlb" }           
          ]
        }
      ]
    }
  ];

const SidebarMenu = ({ items, depthStep, depth, expanded }) => {
  return (    
      <List disablePadding dense>
        {itemsTmp.map((sideMenuItem, index) => (
          <React.Fragment key={`${sideMenuItem.name}${index}`}>
            {sideMenuItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SideMenuItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sideMenuItem}
              />
            )}            
          </React.Fragment>
        ))}
      </List>    
  );
}

export default SidebarMenu;