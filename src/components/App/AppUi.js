import React from "react";
import { TodoContext } from "@components/Context";
import { TodoCounter } from "@components/TodoCounter";
import { TodoSearch } from "@components/TodoSearch";
import { TodoList } from "@components/TodoList";
import { TodoItem } from "@components/TodoItem";
import { CreateTodoButton } from "@components/CreateTodoButton";
// import './App.css';

function AppUi() {
	return (
		<>
			<TodoCounter />
			<TodoSearch />
			<TodoContext.Consumer>
				{({ error, loading, searchedTodos, toggleCompleteTodo, deleteTodo }) => (
					<TodoList >
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
				)}
			</TodoContext.Consumer>
			<CreateTodoButton />
		</>
	);
}

export { AppUi };
