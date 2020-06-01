import React from 'react';
import Label from '../../../dynamic/label'; 
import PropTypes from 'prop-types';

const OrdersList = (props) =>{

    return (
        <Label labelId="orderslistWelcomelb" />
    )
}

OrdersList.propTypes={
    ordersList : PropTypes.array
}


export default OrdersList