import React, { useState , useEffect } from 'react';
import Todo from './Todo';
import CompletedTodo from './CompletedTodo';
import {Button, FormControl, TextField} from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import AddIcon from '@material-ui/icons/Add';

function App() {

  const [ todos, setTodos ] = useState([]);
  const [ title , setTitle ] = useState('');
  const [ discription , setDiscription ] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map( doc => ({id : doc.id , todo : doc.data().todo , discription : doc.data().discription, isDone : doc.data().isDone})))
    });
    },[]);

  const addTodo = (event)=> {

    event.preventDefault();
    db.collection('todos').add({
      todo : title,
      discription : discription,
      isDone : false,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setTitle('');
    setDiscription('');
  }
  

  return (
    <div className="App">
      <h1> Add a Todo! 🚀 </h1>
      <form>
        <FormControl>
         <TextField 
         InputProps={{
              className: 'Title'
            }} 
         label=" Title 🔥 " 
         variant="outlined"
         value = {title}
         onChange = { event => setTitle(event.target.value)}
         />
        </FormControl>
        <Button disabled ={!title} type = "submit" onClick = {addTodo} variant = "contained" color = "primary"
        InputProps={{
              className: 'AddTodoBtn'
            }}
            startIcon = {<AddIcon/>}
            >
          Add Todo
        </Button>
      </form>
      <TextField
      InputProps={{
              className: 'Discription'
            }}
          label=" Discription 🔥 "
          multiline
          rows={4}
          value={discription}
          onChange={ event => setDiscription(event.target.value)}
          variant="outlined"
        />
      <div>
      <div>
      <ul>
        { todos.filter(todo => (!todo.isDone)).map(todo => 
           <Todo todo = {todo}/>
        )}
      </ul>
      </div>
      <p>Completed!</p>
      <div>
       <ul>
        { todos.filter(todo => (todo.isDone)).map(todo => (
          <CompletedTodo todo = {todo}/>
        ) 
        )}
      </ul>
      </div>
    </div>
   </div>
  );
}

export default App;
