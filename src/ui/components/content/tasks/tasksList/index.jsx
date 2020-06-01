import React from 'react';
import Label from '../../../dynamic/label';
import PropTypes from 'prop-types';

const TasksList = (props) =>{

    return (
        <Label labelId="taskslistWelcomelb" />
    )
}

TasksList.propTypes={
    tasksList   : PropTypes.array
}


export default TasksList