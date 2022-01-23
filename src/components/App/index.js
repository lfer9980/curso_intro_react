import React from "react";
import { AppUi } from "./AppUi";

/* const defaultTodos = [
	{ text: "Cortar cebolla", completed: true },
	{ text: "Tomar el cursso de intro a React", completed: false },
	{ text: "Llorar con la llorona", completed: false },
	{ text: "LALALALAA", completed: true },
]; */

function useLocalStorage(itemName, initialValue) {
	/* guardando en localStorage */
	const localStorageItem = localStorage.getItem(itemName);
	let parsedItem = initialValue;

	if (!localStorageItem) {
		localStorage.setItem(itemName, JSON.stringify(initialValue));
	} else {
		parsedItem = JSON.parse(localStorageItem)
	}

	const [item, setItem] = React.useState(parsedItem);

	const saveItem = (newItem) => {
		const stringifiedItem = JSON.stringify(newItem);
		localStorage.setItem(itemName, stringifiedItem);
		setItem(newItem);
	}

	return [
		item,
		saveItem,
	];
}


function App() {

	const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

	const [searchValue, setSearchValue] = React.useState("");


	
	/* contador de todos */
	const completedTodos = todos.filter((todo) => todo.completed).length;
	const totalTodos = todos.length;

	/* filtrado de todos */
	let searchedTodos = [];

	if (!searchValue.length >= 1) {
		searchedTodos = todos;
	} else {
		searchedTodos = todos.filter((todo) => {
			const todoText = todo.text.toLowerCase();
			const searchText = searchValue.toLowerCase();

			return todoText.includes(searchText);
		});
	}




	const toggleCompleteTodo = (text) => {
		const todoIndex = todos.findIndex((todo) => todo.text === text);
		const newTodos = [...todos];
		newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
		saveTodos(newTodos);
	};

	const deleteTodo = (text) => {
		const newTodos = todos.filter((todo) => todo.text !== text);
		saveTodos(newTodos);
		/* 
		const todoIndex = todos.findIndex(todo => todo.text === text);
		const newTodos = [...todos];
		newTodos.splice(newTodos[todoIndex], 1)
		setTodos(newTodos); */
	};

	return (
		<AppUi
			totalTodos={totalTodos}
			completedTodos={completedTodos}
			searchValue={searchValue}
			setSearchValue={setSearchValue}
			searchedTodos={searchedTodos}
			toggleCompleteTodo={toggleCompleteTodo}
			deleteTodo={deleteTodo}
		/>
	);
}

export default App;
