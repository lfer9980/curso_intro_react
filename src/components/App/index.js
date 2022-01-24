import React from "react";
import { AppUi } from "./AppUi";

/* const defaultTodos = [
	{ text: "Cortar cebolla", completed: true },
	{ text: "Tomar el cursso de intro a React", completed: false },
	{ text: "Llorar con la llorona", completed: false },
	{ text: "LALALALAA", completed: true },
]; */

function useLocalStorage(itemName, initialValue) {
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [item, setItem] = React.useState(initialValue);

	React.useEffect( () =>{
		setTimeout(() => {
			try {
				/* guardando en localStorage */
				const localStorageItem = localStorage.getItem(itemName);
				let parsedItem = initialValue;

				if (!localStorageItem) {
					localStorage.setItem(itemName, JSON.stringify(initialValue));
				} else {
					parsedItem = JSON.parse(localStorageItem)
				}

				setItem(parsedItem);
				setLoading(false);
			} catch(error) {
				setError(error)
			}
		}, 5000);
	}, []);

	const saveItem = (newItem) => {
		try {
			const stringifiedItem = JSON.stringify(newItem);
			localStorage.setItem(itemName, stringifiedItem);
			setItem(newItem)
		} catch {
			setError(error);
		}
	}

	return {
		item,
		saveItem,
		loading,
		error,
	};
}


function App() {
	const {
		item: todos, 
		saveItem: saveTodos,
		loading: loading,
		error: error,
	} = useLocalStorage('TODOS_V1', []);
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
			loading={loading}
			error={error}
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
