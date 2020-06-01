import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ getWordById, labelId }) => {

    let word = getWordById(labelId);
    return (
        word ? word : 'Loading...'
    )
}
Label.PropTypes = {
    labelId: PropTypes.string.isRequired
}

export default Label