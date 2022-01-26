import React from "react";
import { TodoContext } from "@components/Context";
import "./TodoForm.css";

function TodoForm({setOpenModal}) {
	const [newTodoValue, setNewTodoValue] = React.useState("")

	const {
		addTodo,	
	} = React.useContext(TodoContext);
	

	const onCancel = () => {
		setOpenModal(false);
	}
	const onSubmit = (event) => {
		//metodo para evitar recargar la pagina
		event.preventDefault();
		addTodo(newTodoValue);
		setOpenModal(false);
	}

	const onChange = (event) => {
		setNewTodoValue(event.target.value);
	};

	return (
		<form onSubmit={onSubmit}>
			<label>Crea tu primer TODO!</label>
			<textarea
				value={newTodoValue}
				onChange={onChange}
				placeholder="Cortar la cebolla para el almuerzo"
			/>
			<div className="TodoForm-buttonContainer">
				<button
				className="TodoForm-button TodoForm-button-cancel"
				type="button"
				onClick={onCancel}
				>
					Cancelar
				</button>
				<button
					className="TodoForm-button TodoForm-button-add"
					type="submit"
				> 
					Añadir
				</button>
			</div>
		</form>
	);
}

export { TodoForm }