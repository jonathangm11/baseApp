import React from 'react';
import Label from '../../../dynamic/label';
import PropTypes from 'prop-types';

const CustomerList = (props) =>{

    return (
        <Label labelId="customerlistWelcomelb" />
    )
}
CustomerList.propTypes={
    customerList   : PropTypes.array
}

export default CustomerList