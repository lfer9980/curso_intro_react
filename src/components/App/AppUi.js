import React from "react";
import { TodoCounter } from "@components/TodoCounter";
import { TodoSearch } from "@components/TodoSearch";
import { TodoList } from "@components/TodoList";
import { TodoItem } from "@components/TodoItem";
import { CreateTodoButton } from "@components/CreateTodoButton";
// import './App.css';

function AppUi({
	loading,
	error,
	totalTodos,
	completedTodos,
	searchValue,
	setSearchValue,
	searchedTodos,
	toggleCompleteTodo,
	deleteTodo,
}) {

	
	return (
		<>
			<TodoCounter completed={completedTodos} total={totalTodos} />
			<TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
			<TodoList>
				{error && <p>desesperate, hubo un error...</p>}
				{loading && <p>Estamos cargando, no desesperes...</p>}
				{(!loading && !searchedTodos.length) && <p>¡Crea tu primer TODO!</p>}
				{searchedTodos.map((todo) => (
					<TodoItem
						key={todo.text}
						text={todo.text}
						completed={todo.completed}
						onComplete={() => toggleCompleteTodo(todo.text)}
						onDelete={() => deleteTodo(todo.text)}
					/>
				))}
			</TodoList>

			<CreateTodoButton />
		</>
	);
}

export { AppUi };
