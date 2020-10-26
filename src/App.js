

function App() {

  

  const addTodo = (event)=> {

    event.preventDefault();
    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <h1> Hey bro! 🚀 </h1>
      <form>
        <FormControl>
          <InputLabel> Write a Todo 🔥 </InputLabel>
          <Input value = {input} onChange = { event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled ={!input} type = "submit" onClick = {addTodo} variant = "contained" color = "primary">
          Add Todo
        </Button>
      </form>

      <ul>
        { todos.map(todo => (
          <Todo todo = {todo}/>
          // <li>{todo}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
