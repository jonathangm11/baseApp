import React from "react";
import Label from "../../../dynamic/label";
import TabContainer from "../../../dynamic/tabs";
import Filter from "../../../dynamic/filter";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";

const OrdersDashboard = (props) => {
  const options = [
    [
      { label: "test1", value: "test1", type: "Product" },
      { label: "test2", value: "test2", type: "Product" },
      { label: "test3", value: "test3", type: "Product" },
    ],
    [
      { label: "test4", value: "test4", type: "Customer" },
      { label: "test5", value: "test5", type: "Customer" },
      { label: "test6", value: "test6", type: "Customer" },
    ],
    [
      { label: "test7", value: "test7", type: "Type" },
      { label: "test8", value: "test8", type: "Type" },
      { label: "test9", value: "test9", type: "Type" },
    ],
  ];
  const fullOptions = options.concat(
    [[
      { label: "test10", value: "test10", type: "Assignee" },
      { label: "test11", value: "test11", type: "Assignee" },
      { label: "test12", value: "test12", type: "Assignee" },
    ],
    [{ label: "test14", value: "test14", type: "Milestones" }]]
  );

  const tabs = [
    {
      value: "allOrders",
      label: "All Orders",
      icon: <LibraryBooksIcon />,
      rowNum: "100",
      ifWrapped: true,
      component: <Filter options={options} fullOptions={fullOptions} />,
    },
    {
      value: "myOrders",
      label: "My Orders",
      icon: <PersonIcon />,
      rowNum: "100",
      ifWrapped: true,
    },
    {
      value: "teamOrders",
      label: "Team Orders",
      icon: <GroupIcon />,
      rowNum: "100",
      ifWrapped: true,
    },
  ];

  return (
    <div>
      <Label labelId="ordersDashboardWelcomelb" />
      <TabContainer tabs={tabs} />
    </div>
  );
};

export default OrdersDashboard;
