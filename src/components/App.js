import React from 'react';
import { TodoCounter } from '@components/TodoCounter';
import { TodoSearch } from '@components/TodoSearch';
import { TodoList } from '@components/TodoList';
import { TodoItem } from '@components/TodoItem';
import { CreateTodoButton } from '@components/CreateTodoButton';
// import './App.css';

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: false },
  { text: 'LALALALAA', completed: true },
];

function App() {

  const [searchValue, setSearchValue] = React.useState('')
  const [todos, setTodos] = React.useState(defaultTodos)

  /* contador de todos */
  const completedTodos = todos.filter(todo => todo.completed).length
  const totalTodos = todos.length;

  /* filtrado de todos */
  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase()  
      const searchText = searchValue.toLowerCase()

      return todoText.includes(searchText) 
    })
  }



  return (
    <>
      <TodoCounter
        completed = {completedTodos}
        total = {totalTodos}
      />
      <TodoSearch
        searchValue = {searchValue}
        setSearchValue = {setSearchValue}
      />  

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </>
  );
}

export default App;
