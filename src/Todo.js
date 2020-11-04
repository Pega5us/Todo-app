import React , { useState, useEffect, useRef }from 'react';
import './Todo.css';
import { Button, ListItem, ListItemText, makeStyles, Modal,  FormControl, TextField ,Backdrop} from '@material-ui/core';
import db from './firebase'
import DeleteIcon from '@material-ui/icons/DeleteForever';
import firebase from 'firebase';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
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
  fabButton: {
    backgroundColor:'#ffffff',
    '&:hover': {
      backgroundColor: '#ffff99',
    }
  },
  wrapper: {
    margin : theme.spacing(1),
    position: 'relative',
  },
  root: {
    width: 400,
  },
  ModalClose:{
    marginLeft: 'auto'
  }
}));

function Todo(props) {

    const classes = useStyles();
    const timer = useRef();
    const [ openEditModal, setOpenEditModal] = useState(false);
    const [ openDiscriptionModal, setOpenDiscriptionModal] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ discription , setDiscription ] = useState('');
    const [ isAnimatingCheck, setIsAnimatingCheck] = useState(false);

    useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
    }, []);

    const handleOpen = () => {
        setOpenEditModal(true);
        setTitle(props.todo.todo);
        setDiscription(props.todo.discription);
    };
    const handleClose = () => {
        setOpenEditModal(false);
        setTitle('');
        setDiscription('');
    };

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

    const updateTodo = () => {

        db.collection('todos').doc(props.todo.id).set({
            todo: title,
            discription : discription,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        }, { merge : true})
        setOpenEditModal(false);
        setOpenDiscriptionModal(false);
    }
     const updateIsDone = () => {
 
        if(!isAnimatingCheck)
        {
            setIsAnimatingCheck(true);
            timer.current = window.setTimeout(() => {
                setIsAnimatingCheck(false);
                    db.collection('todos').doc(props.todo.id).set({
                    isDone : !props.todo.isDone,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp()
                }, { merge : true}    
                )
            }, 1500);
        }
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
        <Modal
            open ={openEditModal}
            onClose = {handleClose}
            className = {classes.modal}
            disableBackdropClick = {true}
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 700,
        }}>
        <fade>
        <div className = {classes.paper}>
        <form>
        <FormControl>
         <TextField 
         InputProps={{
              className: 'Title'
            }} 
         label=" Title 🔥" 
         variant="outlined"
         value = {title}
         onChange = { event => setTitle(event.target.value)}
         />
        </FormControl>
        <Button disabled ={!title} type = "submit" onClick = {updateTodo} variant = "contained" color = "primary"
        InputProps={{
              className: 'AddTodoBtn'
            }}
            startIcon = {<SaveIcon/>}
            >
          Save Todo
        </Button>
      </form>
      <TextField
      InputProps={{
              className: 'Discription'
            }}
          label=" Discription 🔥"
          multiline
          rows={4}
          value={discription}
          onChange={ event => setDiscription(event.target.value) }
          variant="outlined"
        />
        </div>
            </fade>
        </Modal>
        <div className = 'Todo_element'>
            <ListItem>
              <div Class = {classes.wrapper}>
                { isAnimatingCheck ? <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" onClick = { updateIsDone }>
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg> : <Fab size = "small" className = { classes.fabButton} onClick = { updateIsDone }>
                    <RadioButtonUncheckedIcon style = {{color : '#ffcc00', fontSize:50}}/>
                </Fab>}
                </div>
                <ListItemText onClick = {handleOpenDiscriptionModal} primary = {props.todo.todo.substring(0,Math.min(60,props.todo.todo.length)) + ((props.todo.todo.length > 60) ? "..." : "")} secondary = {props.todo.discription.substring(0,Math.min(60,props.todo.discription.length))+ ((props.todo.discription.length > 60) ? "..." : "")} />
                <Button onClick = {handleOpen} variant = "contained" color = "primary" size = 'small'
                startIcon={<EditIcon />} >Edit</Button>
                <Button
                    variant="contained"
                    color="secondary" 
                    className={classes.button}
                    startIcon={<DeleteIcon/>}
                    size = 'small'
                    onClick = { event => db.collection('todos').doc(props.todo.id).delete()}
                    >
                    Delete
                </Button>
            </ListItem>
        </div>
        </>
    )
}

export default Todo
