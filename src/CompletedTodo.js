import React from 'react';
import clsx from 'clsx';
import './Todo.css';
import { Button, ListItem, ListItemText, makeStyles } from '@material-ui/core';

import db from './firebase'
import DeleteIcon from '@material-ui/icons/DeleteForever';
import firebase from 'firebase';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 8, 5),
  },
   button: {
    margin: theme.spacing(1),
  },
   wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
   checkFabButton: {
    backgroundColor:'#00cc00',
    '&:hover': {
      backgroundColor: '#00b300',
    },
  },
}));


function CompletedTodo(props) {


    const classes = useStyles();

    const buttonClassname = clsx({
    [classes.checkFabButton]: true,
    [classes.wrapper]:true
    });

    const updateIsDone = () => {

        db.collection('todos').doc(props.todo.id).set({
        isDone : !props.todo.isDone,
        timestamp : firebase.firestore.FieldValue.serverTimestamp()
        }, { merge : true}    
        )

    }
    return (
        <div className = 'Todo_element'>
            <ListItem >
                <Fab size = "small" className={buttonClassname}  onClick = { updateIsDone }>
                    <CheckIcon style = {{color : '#ffffff'}}/>
                </Fab>
                <ListItemText primary = {props.todo.todo} secondary = {props.todo.discription} />
                <Button
                    variant="contained"
                    color="secondary" 
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    size = 'small'
                    onClick = { event => db.collection('todos').doc(props.todo.id).delete()}
                    >
                    Delete
                </Button>
            </ListItem>
        </div>
    )
}

export default CompletedTodo
