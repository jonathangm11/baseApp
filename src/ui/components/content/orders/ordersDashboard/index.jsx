import React from 'react';
import Label from '../../../dynamic/label';
import Filter from '../../../dynamic/filter'

const OrdersDashboard = (props) =>{
    return (
        <div>
        <Label labelId="ordersDashboardWelcomelb" />
        <Filter filterTypesArr={["Product", "Customer", "Type"]}/>
        </div>
    )
}

export default OrdersDashboard