import React from 'react';
import './Todo.css';
import { List, ListItem, ListItemText} from '@material-ui/core';

import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function Todo(props) {
    return (
        <List>
            <ListItem>
                <ListItemText primary = {props.todo.todo} secondary = "Dummy deadline ⏰ " />
            </ListItem>
            <DeleteForeverIcon onClick = { event => db.collection('todos').doc(props.todo.id).delete()} />
        </List>
    )
}

export default Todo
