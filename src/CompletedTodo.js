import React , { useState } from 'react';
import clsx from 'clsx';
import './Todo.css';
import { Button, ListItem, Modal, ListItemText, makeStyles, Backdrop } from '@material-ui/core';

import db from './firebase'
import DeleteIcon from '@material-ui/icons/DeleteForever';
import firebase from 'firebase';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




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
  root: {
    width: 400,
  },
  ModalClose:{
    marginLeft: 'auto'
  }
}));


function CompletedTodo(props) {


    const classes = useStyles();
    const [ openDiscriptionModal, setOpenDiscriptionModal] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ discription , setDiscription ] = useState('');


    const handleOpenDiscriptionModal = () => {
        setOpenDiscriptionModal(true);
        setTitle(props.todo.todo);
        setDiscription(props.todo.discription);
    };

    const handleCloseDiscriptionModal = () => {
        setOpenDiscriptionModal(false);
        setTitle('');
        setDiscription('');
    };

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
      <>
      <Modal
            open ={openDiscriptionModal}
            onClose = {handleCloseDiscriptionModal}
            className = {classes.modal}
            disableBackdropClick = {true}
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 700,
        }}>
        <fade>
          <Card className={classes.root}>
        <CardContent>
        <Typography variant="body1" component="p">
          <b>Title - </b>{title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        <p><span style = {{color : '#000000'}}><b>Discription - </b></span>{discription}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button className = {classes.ModalClose} size="small" variant = "contained" color = "primary"
        onClick = {handleCloseDiscriptionModal}>Close</Button>
      </CardActions>
    </Card>
        </fade>
        </Modal>
        <div className = 'Todo_element'>
            <ListItem >
                <Fab size = "small" className={buttonClassname}  onClick = { updateIsDone }>
                    <CheckIcon style = {{color : '#ffffff'}}/>
                </Fab>
                <ListItemText onClick = {handleOpenDiscriptionModal} primary = {props.todo.todo} secondary = {props.todo.discription.substring(0,Math.min(60,props.todo.discription.length))+"..."} />
                <Button
                    variant="contained"
                    color="secondary" 
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    size = 'small'
                    onClick = { () => db.collection('todos').doc(props.todo.id).delete()}
                    >
                    Delete
                </Button>
            </ListItem>
        </div>
        </>
    )
}

export default CompletedTodo
