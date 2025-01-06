// uuid just give you an unique key for each statement
import { v4 as uuidv4 } from 'uuid';
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './app.css';


import Navbar from './components/Navbar'

function App() {
  // this is our Inputtext
  const [todo, setTodo] = useState("")

  // this is our array that will hold all the todos
  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    // this is where we get all the todos from the local storage

    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"));

      setTodos(todos);
    }
  }, [])


  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const togglefinish = (e) => {

    setshowFinished(!showFinished);

  }




  const handeleidt = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);

    const isConfirmed = confirm("Are you sure you want to delete this todo?");

    if (isConfirmed) {
      let newTodos = todos.filter(item => {
        return item.id != id;
      });

      setTodos(newTodos);
      savetoLS();

    } else {
      console.log("Deletion Cancel")
    }


  }

  const handeldelete = (e, id) => {

    // SYNTAX
    // let result = confirm(message);

    const isConfirmed = confirm("Are you sure you want to delete this todo?");

    if (isConfirmed) {
      let newTodos = todos.filter(item => {
        return item.id != id;
      });

      setTodos(newTodos);
      savetoLS();

    } else {
      console.log("Deletion Cancel")
    }




  }

  const handeladd = () => {

    if (todo.trim() == "") {
      alert("Please enter a todo")
      return;
    }

    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    // console.log(todos);
    savetoLS();


  }
  const handelChange = (e) => {

    // we are doing this bez 
    // jjjiidhhduurr
    // for this type of input
    setTodo(e.target.value);
  }

  const handelcheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    savetoLS();
  }

  return (
    <>

      <Navbar />


      <div className="  container bg-cyan-100 rounded-xl mx-auto my-5 w-10/12 pl-10 min-h-screen " >
        <h1 className='font-bold'>Manage Your Todos At One-Place</h1>

        <div className=" addtodo font-bold my-5">
          <h2>Add a Todo</h2>
          <input onChange={handelChange} value={todo} type="text" name="" id="" className=' border-2 border-black w-80 rounded-md ' />
          <button onClick={handeladd} className='bg-cyan-600 mx-2 rounded-md text-1xl hover:bg-slate-600 text-neutral-200 font-sans w-20 p-1'>Add</button>
        </div>

        <input onChange={togglefinish} type="checkbox" name=" " checked={showFinished} id="" /> Show Finished
        <h2 className='font-bold '>Your Todos</h2>

        <div className="todos m-5 ">
          {todos.length === 0 && <div>No Todos To Display</div>}

          {todos.map(item => {

            return (showFinished || !item.iscompleted) && <div key={item.id} className=" todo flex justify-between w-1/4  ">

              <div className="flex gap-4 items-center justify-center text-left w-full	">
                <input onClick={handelcheckbox} type="checkbox" value={item.iscompleted} name={item.id} id="" />

                <div className={`flex-grow ${item.iscompleted ? "line-through" : ""} break-words max-w-80`}>{item.todo}</div>


                <div className="buttons flex flex-row items-start my-2">

                  <button onClick={(e) => handeleidt(e, item.id)} className='bg-cyan-600 mx-2 rounded-md text-1xl hover:bg-slate-600 text-neutral-200 font-sans w-20 p-1'>Edit</button>
                  <button onClick={(e) => { handeldelete(e, item.id) }} className='bg-cyan-600 mx-2 rounded-md text-1xl hover:bg-slate-600 text-neutral-200 font-sans w-20 p-1'>Delete</button>
                </div>
              </div>

            </div>
          })}
        </div>


      </div>

    </>
  )
}

export default App
