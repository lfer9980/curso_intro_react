import React from "react";
import { useLocalStorage} from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
	const {
		item: todos,
		saveItem: saveTodos,
		loading: loading,
		error: error,
	} = useLocalStorage("TODOS_V1", []);
	const [searchValue, setSearchValue] = React.useState("");
	const [openModal, setOpenModal] = React.useState(false);

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

	const addTodo = (text) => {
		if (!text) {
			return
		}
		const newTodos = [...todos];
		newTodos.push({
			completed: false,
			text: text,
		})
		saveTodos(newTodos);
	};

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
		<TodoContext.Provider value={{
			loading,
			error,
			totalTodos,
			completedTodos,
			searchValue,
			setSearchValue,
			searchedTodos,
			addTodo,
			toggleCompleteTodo,
			deleteTodo,
			openModal,
			setOpenModal,
			saveTodos,
		}}>
			{props.children}
		</TodoContext.Provider>
	);
}

export { TodoContext, TodoProvider };