import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import ToDoForm from './components/ToDoForm'
import ToDoItem from './components/ToDoItem'


function App() {
  //State to manage the to-do list
  const [todos, setTodos] = useState([])
  //Function to add a new to-do
  const addTodo = (todo) => {
    setTodos((prev) => [...prev , {id : Date.now() , ...todo }]);
  }
  //Function to update an exsiting to-do
  const updateTodo = (id , todo) =>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )));
  }
  //Function to delete a to-do
  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((todo) => todo.id !== id ));
  }
  //Function to toggle the completion status 
  const toggleComplete = (id) =>{
    setTodos((prev) => prev.map((prevTodo => prevTodo.id === id ? 
      {...prevTodo , completed : !prevTodo.completed } : prevTodo)));
  }
  //Update localStorage whenever todos change
  useEffect(()=> {
    JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0 ){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  } , [todos])

  
  return (
    //TodoProvider provides the todo context to its children
    <TodoProvider value={{todos , addTodo , deleteTodo , updateTodo , toggleComplete }}>
 <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <ToDoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        { todos.map((todo) => (
                         <div className='w-full' key={todo.id}>
                          <ToDoItem todo = {todo}/>
                         </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
